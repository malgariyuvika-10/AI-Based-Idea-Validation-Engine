import json
import re
from typing import Any


class ResponseFormatter:
    REQUIRED_KEYS = {
        "idea_score",
        "strengths",
        "weaknesses",
        "market_potential",
        "risk_analysis",
        "suggestions",
    }

    def parse_validation_response(self, raw_response: str) -> dict[str, Any]:
        data = self._load_json(raw_response)
        missing = self.REQUIRED_KEYS.difference(data.keys())
        if missing:
            raise ValueError(f"AI response missing required keys: {', '.join(sorted(missing))}")

            score = data.get("idea_score", 0)

            try:
               safe_score = int(score) if score is not None else 0
               data["idea_score"] = max(0, min(100, safe_score))
            except (TypeError, ValueError):
               data["idea_score"] = 0
               
        for key in ["strengths", "weaknesses", "suggestions"]:
            value = data.get(key)
            if isinstance(value, str):
                data[key] = [value]
            elif not isinstance(value, list):
                data[key] = []

        for key in ["market_potential", "risk_analysis"]:
            if not isinstance(data.get(key), str):
                data[key] = str(data.get(key, ""))

        return data

    def _load_json(self, raw_response: str) -> dict[str, Any]:
        try:
            parsed = json.loads(raw_response)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", raw_response, re.DOTALL)
            if not match:
                raise
            parsed = json.loads(match.group(0))

        if not isinstance(parsed, dict):
            raise ValueError("AI response must be a JSON object.")

        return parsed
