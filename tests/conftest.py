from backend.app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)