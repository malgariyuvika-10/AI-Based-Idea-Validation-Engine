from unittest.mock import patch, MagicMock
from backend.app.services.validation_service import ValidationService
from backend.app.services.local_ai_validation_service import LocalAIValidationService
from backend.app.services.scoring_service import ScoringService
from backend.app.services.report_service import ReportService

class MockIdea:
    def __init__(self, provider="local", **kwargs):
        self.provider = provider
        self.title = kwargs.get("title", "Test")
        self.description = kwargs.get("description", "Test")
        self.target_audience = kwargs.get("target_audience", "Test")
        self.industry = kwargs.get("industry", "Test")
        self.revenue_model = kwargs.get("revenue_model", "Test")
        self.api_key = kwargs.get("api_key", None)
        self.idea = kwargs.get("idea", "Test Idea")
    
    def dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "target_audience": self.target_audience,
            "industry": self.industry,
            "revenue_model": self.revenue_model
        }

def test_validation_service_local():
    with patch("backend.app.services.ollama_service.OllamaService.generate", return_value='{"overall_score": 80}'):
        with patch("backend.app.services.response_formatter.ResponseFormatter.parse_validation_response", return_value={"overall_score": 80}):
            service = ValidationService()
            idea = MockIdea(provider="local")
            result = service.validate(idea)
            assert result["overall_score"] == 80

def test_validation_service_gemini():
    with patch("backend.app.services.gemini_service.GeminiService.validate_idea", return_value={"overall_score": 90}):
        service = ValidationService()
        idea = MockIdea(provider="gemini", api_key="test_key")
        result = service.validate(idea)
        assert result["overall_score"] == 90

def test_local_ai_validation_service():
    with patch("backend.app.services.ollama_service.OllamaService.generate", return_value='{"idea_score": 85}'):
        service = LocalAIValidationService()
        payload = MagicMock()
        payload.idea = "A business for selling tea."
        payload.title = "Tea Shop"
        payload.target_audience = "Students"
        payload.industry = "F&B"
        payload.revenue_model = "Sales"
        
        result = service.validate(payload)
        assert result["overall_score"] == 85
        assert result["language"]["code"] == "en"

def test_scoring_service():
    service = ScoringService()
    score = service.calculate_score(80, 70, 50)
    # 80*0.4 + 70*0.4 + 50*0.2 = 32 + 28 + 10 = 70
    assert score == 70.0

def test_report_service():
    service = ReportService()
    result = service.generate({}, 85)
    assert result["overall_score"] == 85
    assert result["recommendation"] == "Proceed"
