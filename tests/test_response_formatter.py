import pytest
from backend.app.services.response_formatter import ResponseFormatter


def test_parse_validation_response_valid_json():
    formatter = ResponseFormatter()
    raw_response = '{"overall_score": 85, "scores": {"market": 90}, "swot": {"strengths": ["test"]}, "success_prediction": {"probability": 85, "label": "High", "reason": "Good"}, "competitors": [], "ai_suggestions": [], "pitch": "test pitch"}'
    result = formatter.parse_validation_response(raw_response)
    assert result["overall_score"] == 85
    assert result["pitch"] == "test pitch"


def test_parse_validation_response_missing_fields():
    formatter = ResponseFormatter()
    raw_response = '{"idea_score": 75, "strengths": ["S1"], "weaknesses": ["W1"], "success_probability": 80}'
    result = formatter.parse_validation_response(raw_response)
    assert result["overall_score"] == 75
    assert result["scores"]["market"] == 70  # default
    assert result["swot"]["strengths"] == ["S1"]
    assert result["success_prediction"]["probability"] == 80
    assert result["success_prediction"]["label"] == "High"
    assert result["pitch"] == "Innovation is at the heart of this idea."


def test_parse_validation_response_markdown_json():
    formatter = ResponseFormatter()
    raw_response = (
        'Here is the result: ```json\n{"overall_score": 60}\n``` hope it helps.'
    )
    result = formatter.parse_validation_response(raw_response)
    assert result["overall_score"] == 60


def test_parse_validation_response_invalid_json():
    formatter = ResponseFormatter()
    raw_response = "Not a json at all"
    with pytest.raises(ValueError, match="Could not find valid JSON"):
        formatter.parse_validation_response(raw_response)


def test_parse_validation_response_malformed_json():
    formatter = ResponseFormatter()
    raw_response = "{'overall_score': 85}"  # Single quotes are invalid in JSON
    with pytest.raises(ValueError, match="AI response contained invalid JSON"):
        formatter.parse_validation_response(raw_response)


def test_parse_validation_response_not_an_object():
    formatter = ResponseFormatter()
    raw_response = "[1, 2, 3]"
    with pytest.raises(ValueError, match="AI response must be a JSON object"):
        formatter.parse_validation_response(raw_response)
