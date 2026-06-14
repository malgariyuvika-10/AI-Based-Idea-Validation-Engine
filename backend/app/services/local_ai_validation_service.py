import hashlib
from typing import Any

from app.services.ollama_service import OllamaService
from app.services.response_formatter import ResponseFormatter
from app.utils.language_detector import LanguageDetector


class LocalAIValidationService:
    _cache: dict[str, dict[str, Any]] = {}

    def __init__(self) -> None:
        self.language_detector = LanguageDetector()
        self.ollama = OllamaService()
        self.formatter = ResponseFormatter()

    def validate(self, payload) -> dict[str, Any]:
        idea_text = payload.idea.strip()
        language = self.language_detector.detect(idea_text)
        cache_key = self._cache_key(idea_text, language.code)

        if cache_key in self._cache:
            return self._cache[cache_key]

        prompt = self._build_prompt(payload, language)
        raw_response = self.ollama.generate(prompt)
        formatted = self.formatter.parse_validation_response(
            raw_response
        )

        result = {
            "language": {
                "code": language.code,
                "name": language.name,
                "is_mixed": language.is_mixed,
            },
            "raw_model": self.ollama.model,
            **formatted,
        }

        self._cache[cache_key] = result
        return result

    def _build_prompt(self, payload, language) -> str:
        context = {
            "idea": payload.idea,
            "title": payload.title or "Not provided",
            "target_audience": (
                payload.target_audience or "Not provided"
            ),
            "industry": payload.industry or "Not provided",
            "revenue_model": (
                payload.revenue_model or "Not provided"
            ),
        }

        return f"""
You are an offline AI startup idea validation expert
running locally through Ollama.

Detected language: {language.name}
Mixed language input: {"yes" if language.is_mixed else "no"}
Response rule: {language.response_instruction}

Validate the startup idea below.
Keep the tone natural, practical,
and conversational.

If input is mixed language such as Hinglish
or Tanglish, understand the mixed input
but answer in the detected Indian language
when possible.

Idea details:
- Title: {context["title"]}
- Idea: {context["idea"]}
- Target audience: {context["target_audience"]}
- Industry: {context["industry"]}
- Revenue model: {context["revenue_model"]}

Return only valid JSON.
Do not include markdown.

Use exactly this schema:
{{
  "idea_score": 0,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "market_potential": "...",
  "risk_analysis": "...",
  "suggestions": ["..."]
}}
""".strip()

    def _cache_key(
        self,
        idea_text: str,
        language_code: str,
    ) -> str:
        normalized = " ".join(
            idea_text.lower().split()
        )

        return hashlib.sha256(
            f"{language_code}:{normalized}".encode()
        ).hexdigest()
