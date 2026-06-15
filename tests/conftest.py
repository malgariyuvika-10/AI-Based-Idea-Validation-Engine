import pytest
from unittest.mock import patch
from backend.app.main import app
from fastapi.testclient import TestClient


@pytest.fixture(autouse=True)
def mock_validation_service():
    mock_response = {
        "overall_score": 85,
        "scores": {
            "market": 90,
            "feasibility": 80,
            "innovation": 85,
            "risk": 70,
            "scalability": 95,
        },
        "swot": {
            "strengths": ["Test Strength"],
            "weaknesses": ["Test Weakness"],
            "opportunities": ["Test Opportunity"],
            "threats": ["Test Threat"],
        },
        "competitors": [
            {"name": "Test Competitor", "positioning": "Leader", "gap": "Price"}
        ],
        "success_prediction": {
            "probability": 85,
            "label": "High",
            "reason": "Market demand is strong.",
        },
        "ai_suggestions": ["Improve UI"],
        "pitch": "The best AI tool for startups.",
        "analysis": {
            "market_summary": "Strong market.",
            "feasibility_summary": "Technically feasible.",
            "risk_summary": "Manageable risks.",
        },
    }
    with patch(
        "backend.app.services.validation_service.ValidationService.validate",
        return_value=mock_response,
    ):
        yield


@pytest.fixture
def client():
    return TestClient(app)
