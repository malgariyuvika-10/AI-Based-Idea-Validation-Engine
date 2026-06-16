def test_validate_idea(client, mock_validation_service):
    payload = {
        "title": "AI Startup",
        "description": "AI platform for students",
        "target_audience": "College Students",
        "industry": "Education",
        "revenue_model": "Subscription",
    }

    response = client.post("/api/validate", json=payload)

    assert response.status_code == 200


def test_validate_idea_local(client):
    from unittest.mock import patch

    payload = {
        "idea": "An AI tool for farmers.",
        "title": "AgroAI",
        "target_audience": "Farmers",
        "industry": "Agriculture",
        "revenue_model": "SaaS",
    }

    with patch(
        "backend.app.services.ollama_service.OllamaService.generate",
        return_value='{"idea_score": 85}',
    ):
        response = client.post("/api/validate-idea", json=payload)
        assert response.status_code == 200
        assert response.json()["overall_score"] == 85


def test_validate_idea_by_id_not_found(client):
    response = client.post("/api/validation/9999")
    assert response.status_code == 404


def test_get_validation_result(client):
    # This currently calls validate_idea_by_id which will return 404 if not found
    response = client.get("/api/validation/9999")
    assert response.status_code == 404
