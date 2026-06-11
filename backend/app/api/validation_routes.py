from fastapi import APIRouter
from app.schemas.idea_schema import IdeaRequest
from app.services.validation_service import ValidationService

router = APIRouter()


@router.post("/validate")
def validate_idea(idea: IdeaRequest):

    result = ValidationService().validate(idea)

    return result