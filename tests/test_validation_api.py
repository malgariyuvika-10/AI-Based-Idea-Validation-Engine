def test_validate_idea(client):
    payload = {
        "title": "AI Startup",
        "description": "AI platform for students",
        "target_audience": "College Students",
        "industry": "Education",
        "revenue_model": "Subscription",
    }

    response = client.post("/api/validate", json=payload)

    assert response.status_code == 200
