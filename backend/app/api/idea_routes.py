from fastapi import APIRouter
from app.schemas.idea_schema import IdeaRequest
from app.database.session import SessionLocal
from app.models.idea_model import Idea
from app.services.validation_service import ValidationService

router = APIRouter()


@router.post("/submit-idea")
@router.post("/ideas")
def submit_idea(idea: IdeaRequest):

    db = SessionLocal()

    new_idea = Idea(
        title=idea.title,
        description=idea.description,
        target_audience=idea.target_audience,
        industry=idea.industry,
        revenue_model=idea.revenue_model
    )

    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)

    db.close()

    # Trigger validation automatically
    validation_result = ValidationService().validate(idea)

    return {
        "message": "Idea saved and validated successfully",
        "idea_id": new_idea.id,
        "title": new_idea.title,
        "description": new_idea.description,
        "target_audience": new_idea.target_audience,
        "industry": new_idea.industry,
        "revenue_model": new_idea.revenue_model,
        "validation_results": validation_result["scores"],
        "analysis": validation_result["analysis"],
        "swot": validation_result["swot"],
        "competitors": validation_result["competitors"],
        "success_prediction": validation_result["success_prediction"],
        "ai_suggestions": validation_result["ai_suggestions"],
        "pitch": validation_result["pitch"],
        "strengths": ", ".join(validation_result["swot"]["strengths"]),
        "weaknesses": ", ".join(validation_result["swot"]["weaknesses"])
    }


@router.get("/ideas")
def get_ideas():

    db = SessionLocal()

    ideas = db.query(Idea).all()

    db.close()

    return ideas
