def test_home_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "AI Idea Validation Engine Backend Running"}
