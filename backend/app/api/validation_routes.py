from fastapi import APIRouter, HTTPException
from app.schemas.idea_schema import IdeaRequest
from app.schemas.validation_schema import LocalIdeaValidationRequest
from app.services.local_ai_validation_service import LocalAIValidationService
from app.services.ollama_service import OllamaError
from app.services.validation_service import ValidationService
from app.database.session import SessionLocal
from app.models.idea_model import Idea

router = APIRouter()


@router.post("/validate-idea")
def validate_idea_local(payload: LocalIdeaValidationRequest):
    try:
        return LocalAIValidationService().validate(payload)
    except OllamaError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/validate")
def validate_idea_direct(idea: IdeaRequest):
    result = ValidationService().validate(idea)
    return result


@router.post("/validation/{idea_id}")
def validate_idea_by_id(idea_id: int):
    db = SessionLocal()
    idea = db.query(Idea).filter(Idea.id == idea_id).first()
    db.close()

    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    # Convert model to schema-like object for validation service
    idea_data = IdeaRequest(
        title=idea.title,
        description=idea.description,
        target_audience=idea.target_audience,
        industry=idea.industry,
        revenue_model=idea.revenue_model
    )

    result = ValidationService().validate(idea_data)
    return result


@router.get("/validation/{idea_id}")
def get_validation_result(idea_id: int):
    # For now, just re-run validation or return a placeholder if not stored
    # In a real app, you'd store the validation result in the DB
    return validate_idea_by_id(idea_id)
