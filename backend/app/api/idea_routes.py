from fastapi import APIRouter
from app.schemas.idea_schema import IdeaRequest
from app.database.session import SessionLocal
from app.models.idea_model import Idea

router = APIRouter()


@router.post("/submit-idea")
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

    return {
        "message": "Idea saved successfully",
        "idea_id": new_idea.id
    }


@router.get("/ideas")
def get_ideas():

    db = SessionLocal()

    ideas = db.query(Idea).all()

    db.close()

    return ideas