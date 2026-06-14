import json
import os
from typing import Any
from urllib.parse import urlparse

import requests


class OllamaError(RuntimeError):
    pass


class OllamaService:
    def __init__(self) -> None:
        self.base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.model = os.getenv("OLLAMA_MODEL", "llama3")
        self.timeout = int(os.getenv("OLLAMA_TIMEOUT_SECONDS", "90"))

    def generate(self, prompt: str) -> str:
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "format": "json",
            "options": {
                "temperature": 0.2,
                "num_predict": 1200,
            },
        }

        parsed_url = urlparse(self.base_url)

        if parsed_url.scheme not in ("http", "https"):
            raise ValueError("Only HTTP/HTTPS URLs are allowed")

        api_url = f"{self.base_url}/api/generate"

        try:
            response = requests.post(
                api_url,
                json=payload,
                headers={"Content-Type": "application/json; charset=utf-8"},
                timeout=self.timeout,
            )

            response.raise_for_status()

            body = response.text

        except requests.exceptions.ConnectionError as exc:
            raise OllamaError(
                "Local AI model is not reachable. Start Ollama and run: ollama run llama3"
            ) from exc

        except requests.exceptions.Timeout as exc:
            raise OllamaError(
                "Local AI model timed out. Try a smaller model such as mistral."
            ) from exc

        except requests.exceptions.RequestException as exc:
            raise OllamaError(f"Ollama request failed: {exc}") from exc

        try:
            parsed: dict[str, Any] = json.loads(body)

        except json.JSONDecodeError as exc:
            raise OllamaError("Ollama returned an invalid response envelope.") from exc

        generated_text = parsed.get("response")

        if not generated_text:
            raise OllamaError("Ollama response did not include generated text.")

        return generated_text
