def test_generate_report_direct(client, mock_validation_service):
    payload = {
        "title": "AI Startup",
        "description": "AI platform for students",
        "target_audience": "College Students",
        "industry": "Education",
        "revenue_model": "Subscription",
    }

    response = client.post("/api/report", json=payload)
    assert response.status_code == 200
    assert "overall_score" in response.json()
    assert "recommendation" in response.json()


def test_get_reports(client):
    response = client.get("/api/reports")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_download_report(client):
    response = client.get("/api/reports/download/123")
    assert response.status_code == 200
    assert response.json()["report_id"] == "123"


def test_generate_report_by_id_not_found(client):
    response = client.post("/api/reports/9999")
    assert response.status_code == 404
