from fastapi import APIRouter
from app.schemas.idea_schema import IdeaRequest

router = APIRouter()

@router.post("/submit-idea")
def submit_idea(idea: IdeaRequest):
    return {
        "message": "Idea received successfully",
        "idea": idea
    }