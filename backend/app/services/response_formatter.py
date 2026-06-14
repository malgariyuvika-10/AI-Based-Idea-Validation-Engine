import json
import re
from typing import Any


class ResponseFormatter:
    def parse_validation_response(self, raw_response: str) -> dict[str, Any]:
        data = self._load_json(raw_response)
        
        # Ensure overall_score exists
        if "overall_score" not in data and "idea_score" in data:
            data["overall_score"] = data["idea_score"]
        
        # Ensure scores exists
        if "scores" not in data:
            data["scores"] = {
                "market": data.get("market_score", 70),
                "feasibility": data.get("feasibility_score", 70),
                "innovation": data.get("innovation_score", 70),
                "risk": data.get("risk_score", 30),
                "scalability": data.get("scalability_score", 70),
                "overall": data.get("overall_score", 70)
            }
        
        # Ensure swot exists
        if "swot" not in data:
            data["swot"] = {
                "strengths": data.get("strengths", []),
                "weaknesses": data.get("weaknesses", []),
                "opportunities": [],
                "threats": []
            }
            
        # Ensure success_prediction exists
        if "success_prediction" not in data:
            prob = data.get("success_probability", 50)
            data["success_prediction"] = {
                "probability": prob,
                "label": "High" if prob >= 75 else "Medium" if prob >= 50 else "Low",
                "reason": data.get("market_potential", "Based on AI analysis.")
            }

        # Ensure competitors exists
        if "competitors" not in data:
            data["competitors"] = []

        # Ensure ai_suggestions exists
        if "ai_suggestions" not in data:
            data["ai_suggestions"] = data.get("suggestions", [])

        # Ensure pitch exists
        if "pitch" not in data:
            data["pitch"] = "Innovation is at the heart of this idea."

        return data

    def _load_json(self, raw_response: str) -> dict[str, Any]:
        try:
            parsed = json.loads(raw_response)
        except json.JSONDecodeError:
            # Try to extract JSON from markdown or other text
            match = re.search(r"\{.*\}", raw_response, re.DOTALL)
            if not match:
                raise ValueError("Could not find valid JSON in AI response.")
            try:
                parsed = json.loads(match.group(0))
            except json.JSONDecodeError:
                raise ValueError("AI response contained invalid JSON.")

        if not isinstance(parsed, dict):
            raise ValueError("AI response must be a JSON object.")

        return parsed
