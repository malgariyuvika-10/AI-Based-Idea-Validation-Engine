from pydantic import BaseModel, Field


class LocalIdeaValidationRequest(BaseModel):
    idea: str = Field(..., min_length=3)
    title: str | None = None
    target_audience: str | None = None
    industry: str | None = None
    revenue_model: str | None = None


class LanguageMetadata(BaseModel):
    code: str
    name: str
    is_mixed: bool


class LocalIdeaValidationResponse(BaseModel):
    language: LanguageMetadata
    idea_score: int
    strengths: list[str]
    weaknesses: list[str]
    market_potential: str
    risk_analysis: str
    suggestions: list[str]
    raw_model: str
