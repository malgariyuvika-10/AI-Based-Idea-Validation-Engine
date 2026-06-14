import json
import os
from typing import Any
from urllib import error, request
from urllib.parse import urlparse


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

        data = json.dumps(payload).encode("utf-8")

        parsed_url = urlparse(self.base_url)

        if parsed_url.scheme not in ("http", "https"):
            raise ValueError("Only HTTP/HTTPS URLs are allowed")

        req = request.Request(
            f"{self.base_url}/api/generate",
            data=data,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )

        try:
            with request.urlopen(req, timeout=self.timeout) as response:  # nosec B310
                body = response.read().decode("utf-8")

        except error.URLError as exc:
            raise OllamaError(
                "Local AI model is not reachable. Start Ollama and run: ollama run llama3"
            ) from exc

        except TimeoutError as exc:
            raise OllamaError(
                "Local AI model timed out. Try a smaller model such as mistral."
            ) from exc

        try:
            parsed: dict[str, Any] = json.loads(body)

        except json.JSONDecodeError as exc:
            raise OllamaError("Ollama returned an invalid response envelope.") from exc

        generated_text = parsed.get("response")

        if not generated_text:
            raise OllamaError("Ollama response did not include generated text.")

        return generated_text
