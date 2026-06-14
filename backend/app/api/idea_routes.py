import json
from fastapi import APIRouter, HTTPException
from app.schemas.idea_schema import IdeaRequest
from app.database.session import SessionLocal
from app.models.idea_model import Idea
from app.services.validation_service import ValidationService
from app.services.ollama_service import OllamaError

router = APIRouter()


@router.post("/submit-idea")
@router.post("/ideas")
def submit_idea(idea: IdeaRequest):

    db = SessionLocal()

    try:
        validation_result = ValidationService().validate(idea)
    except OllamaError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    scores = validation_result.get("scores", {})
    swot = validation_result.get("swot", {})

    new_idea = Idea(
        title=idea.title,
        description=idea.description,
        target_audience=idea.target_audience,
        industry=idea.industry,
        revenue_model=idea.revenue_model,
        provider=idea.provider,
        overall_score=validation_result.get("overall_score", 0),
        market_score=scores.get("market", 0),
        feasibility_score=scores.get("feasibility", 0),
        risk_score=scores.get("risk", 0),
        strengths=json.dumps(swot.get("strengths", [])),
        weaknesses=json.dumps(swot.get("weaknesses", [])),
    )

    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)

    db.close()

    # Unify response structure for frontend
    return {
        "message": "Idea saved and validated successfully",
        "idea_id": new_idea.id,
        "title": new_idea.title,
        "description": new_idea.description,
        "target_audience": new_idea.target_audience,
        "industry": new_idea.industry,
        "revenue_model": new_idea.revenue_model,
        "provider": new_idea.provider,
        "validation_results": scores,
        "analysis": validation_result.get("analysis", {}),
        "swot": swot,
        "competitors": validation_result.get("competitors", []),
        "success_prediction": validation_result.get("success_prediction", {}),
        "ai_suggestions": validation_result.get("ai_suggestions", []),
        "pitch": validation_result.get("pitch", ""),
        "overall_score": validation_result.get("overall_score", 0),
    }


@router.get("/ideas")
def get_ideas():

    db = SessionLocal()

    ideas = db.query(Idea).all()

    db.close()

    return ideas
