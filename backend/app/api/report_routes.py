from fastapi import APIRouter
from app.schemas.idea_schema import IdeaRequest
from app.services.validation_service import ValidationService
from app.services.report_service import ReportService

router = APIRouter()


@router.post("/report")
def generate_report(idea: IdeaRequest):

    validation_result = (
        ValidationService().validate(idea)
    )

    report = ReportService().generate(
        validation_result["analysis"],
        validation_result["overall_score"]
    )

    return report