from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_create_idea():
    payload = {
        "title": "AI Startup",
        "description": "A tool for idea validation",
        "target_audience" : "Startups",
        "industry": "AI",
        "revenue_model": "SaaS"
    }

    response = client.post("/api/ideas", json=payload)

    assert response.status_code in [200, 201]

def test_create_idea_missing_fields():
    payload = {"title": "AI"}

    response = client.post("/api/ideas", json=payload)

    assert response.status_code == 422