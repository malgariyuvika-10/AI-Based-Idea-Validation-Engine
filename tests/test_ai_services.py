import pytest
from unittest.mock import patch, MagicMock
from backend.app.services.gemini_service import GeminiService
from backend.app.services.ollama_service import OllamaService, OllamaError
import requests


def test_gemini_service_init_no_key():
    with patch.dict("os.environ", {}, clear=True):
        with pytest.raises(ValueError, match="Gemini API key is required"):
            GeminiService()


def test_gemini_service_generate():
    with patch("google.generativeai.configure"):
        with patch("google.generativeai.GenerativeModel") as mock_model:
            mock_instance = mock_model.return_value
            mock_response = MagicMock()
            mock_response.text = '{"score": 100}'
            mock_instance.generate_content.return_value = mock_response

            service = GeminiService(api_key="test_key")
            result = service.generate("test prompt")
            assert result == '{"score": 100}'


def test_ollama_service_generate_success():
    with patch("requests.post") as mock_post:
        mock_response = MagicMock()
        mock_response.text = '{"response": "{\\"score\\": 100}"}'
        mock_response.status_code = 200
        mock_post.return_value = mock_response

        service = OllamaService()
        result = service.generate("test prompt")
        assert result == '{"score": 100}'


def test_ollama_service_generate_connection_error():
    with patch("requests.post", side_effect=requests.exceptions.ConnectionError):
        service = OllamaService()
        with pytest.raises(OllamaError, match="Local AI model is not reachable"):
            service.generate("test prompt")


def test_ollama_service_generate_timeout():
    with patch("requests.post", side_effect=requests.exceptions.Timeout):
        service = OllamaService()
        with pytest.raises(OllamaError, match="Local AI model timed out"):
            service.generate("test prompt")


def test_ollama_service_invalid_url():
    with patch.dict("os.environ", {"OLLAMA_BASE_URL": "ftp://localhost"}, clear=False):
        service = OllamaService()
        with pytest.raises(ValueError, match="Only HTTP/HTTPS URLs are allowed"):
            service.generate("test prompt")
