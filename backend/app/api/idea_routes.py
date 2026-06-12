from fastapi import APIRouter, HTTPException
from app.schemas.idea_schema import IdeaRequest
from app.schemas.validation_schema import LocalIdeaValidationRequest
from app.database.session import SessionLocal
from app.models.idea_model import Idea
from app.services.local_ai_validation_service import LocalAIValidationService
from app.services.ollama_service import OllamaError

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

    local_payload = LocalIdeaValidationRequest(
        idea=idea.description,
        title=idea.title,
        target_audience=idea.target_audience,
        industry=idea.industry,
        revenue_model=idea.revenue_model
    )

    try:
        validation_result = LocalAIValidationService().validate(local_payload)
    except OllamaError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    idea_score = validation_result["idea_score"]
    risk_score = max(0, min(100, 100 - idea_score))

    return {
        "message": "Idea saved and validated successfully",
        "idea_id": new_idea.id,
        "title": new_idea.title,
        "description": new_idea.description,
        "target_audience": new_idea.target_audience,
        "industry": new_idea.industry,
        "revenue_model": new_idea.revenue_model,
        "language": validation_result["language"],
        "validation_results": {
            "overall": idea_score,
            "market": idea_score,
            "feasibility": idea_score,
            "innovation": idea_score,
            "risk": risk_score,
            "scalability": idea_score
        },
        "analysis": {
            "market": {
                "market_score": idea_score,
                "market_summary": validation_result["market_potential"]
            },
            "risk": {
                "risk_score": risk_score,
                "risk_summary": validation_result["risk_analysis"]
            }
        },
        "swot": {
            "strengths": validation_result["strengths"],
            "weaknesses": validation_result["weaknesses"],
            "opportunities": [validation_result["market_potential"]],
            "threats": [validation_result["risk_analysis"]]
        },
        "competitors": [],
        "success_prediction": {
            "probability": idea_score,
            "label": "High" if idea_score >= 75 else "Medium" if idea_score >= 50 else "Low",
            "reason": validation_result["market_potential"]
        },
        "ai_suggestions": validation_result["suggestions"],
        "pitch": "",
        "local_ai_response": validation_result,
        "strengths": ", ".join(validation_result["strengths"]),
        "weaknesses": ", ".join(validation_result["weaknesses"])
    }


@router.get("/ideas")
def get_ideas():

    db = SessionLocal()

    ideas = db.query(Idea).all()

    db.close()

    return ideas
