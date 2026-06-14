import os
import json
import google.generativeai as genai
from typing import Any, Optional

class GeminiService:
    def __init__(self, api_key: Optional[str] = None) -> None:
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("Gemini API key is required. Provide it in .env or via BYOK.")
        
        genai.configure(api_key=self.api_key)
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        self.model = genai.GenerativeModel(self.model_name)

    def generate(self, prompt: str) -> str:
        try:
            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.2,
                    response_mime_type="application/json",
                )
            )
            return response.text
        except Exception as e:
            raise RuntimeError(f"Gemini AI error: {str(e)}")

    def validate_idea(self, idea_data: dict) -> dict[str, Any]:
        prompt = self._build_prompt(idea_data)
        raw_response = self.generate(prompt)
        try:
            return json.loads(raw_response)
        except json.JSONDecodeError:
            # Fallback if model didn't return valid JSON despite instruction
            raise RuntimeError("Gemini returned an invalid response format.")

    def _build_prompt(self, idea_data: dict) -> str:
        return f"""
        You are an expert startup idea validation consultant.
        Validate the following startup idea:
        
        Title: {idea_data.get('title')}
        Description: {idea_data.get('description')}
        Target Audience: {idea_data.get('target_audience')}
        Industry: {idea_data.get('industry')}
        Revenue Model: {idea_data.get('revenue_model')}
        
        Return a comprehensive validation report in JSON format with the following structure:
        {{
          "overall_score": 0-100,
          "scores": {{
            "market": 0-100,
            "feasibility": 0-100,
            "innovation": 0-100,
            "risk": 0-100,
            "scalability": 0-100
          }},
          "swot": {{
            "strengths": ["..."],
            "weaknesses": ["..."],
            "opportunities": ["..."],
            "threats": ["..."]
          }},
          "competitors": [
            {{ "name": "...", "positioning": "...", "gap": "..." }}
          ],
          "success_prediction": {{
            "probability": 0-100,
            "label": "Low/Medium/High",
            "reason": "..."
          }},
          "ai_suggestions": ["..."],
          "pitch": "A short elevator pitch"
        }}
        """
