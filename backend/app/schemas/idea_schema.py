from pydantic import BaseModel

class IdeaRequest(BaseModel):
    title: str
    description: str
    target_audience: str
    industry: str
    revenue_model: str