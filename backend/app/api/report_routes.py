from fastapi import APIRouter, HTTPException
from backend.app.schemas.idea_schema import IdeaRequest
from backend.app.services.validation_service import ValidationService
from backend.app.services.report_service import ReportService
from backend.app.database.session import SessionLocal
from backend.app.models.idea_model import Idea

router = APIRouter()


@router.post("/report")
def generate_report_direct(idea: IdeaRequest):

    validation_result = ValidationService().validate(idea)

    report = ReportService().generate(
        validation_result["analysis"], validation_result["overall_score"]
    )

    return {
        **report,
        "scores": validation_result["scores"],
        "swot": validation_result["swot"],
        "competitors": validation_result["competitors"],
        "success_prediction": validation_result["success_prediction"],
        "ai_suggestions": validation_result["ai_suggestions"],
        "pitch": validation_result["pitch"],
    }


@router.post("/reports/{idea_id}")
def generate_report_by_id(idea_id: int):
    db = SessionLocal()
    idea = db.query(Idea).filter(Idea.id == idea_id).first()
    db.close()

    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    idea_data = IdeaRequest(
        title=str(idea.title),
        description=str(idea.description),
        target_audience=str(idea.target_audience),
        industry=str(idea.industry),
        revenue_model=str(idea.revenue_model),
    )

    return generate_report_direct(idea_data)


@router.get("/reports")
def get_reports():
    # Return placeholder or actual reports if stored
    return []


@router.get("/reports/download/{report_id}")
def download_report(report_id: str):
    return {
        "message": "Use the frontend PDF Report page to print or save the latest validation report as PDF.",
        "report_id": report_id,
    }
