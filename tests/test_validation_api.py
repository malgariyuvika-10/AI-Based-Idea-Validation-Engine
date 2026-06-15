from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_validate_idea():
    payload = {
        "title": "AI Startup",
        "description": "AI platform for students",
        "target_audience": "College Students",
        "industry": "Education",
        "revenue_model": "Subscription"
    }

    response = client.post("/api/validate", json=payload)

    assert response.status_code == 200