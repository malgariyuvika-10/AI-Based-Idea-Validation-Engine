from pydantic import BaseModel
from typing import Optional

class IdeaRequest(BaseModel):
    title: str
    description: str
    target_audience: str
    industry: str
    revenue_model: str
    provider: Optional[str] = "local" # "local" (Ollama) or "gemini"
    api_key: Optional[str] = None # For BYOK
