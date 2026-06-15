from backend.app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_home_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "AI Idea Validation Engine Backend Running"
    }