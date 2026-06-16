from backend.app.agents.coordinator_agent import CoordinatorAgent
from backend.app.agents.market_agent import MarketAgent
from backend.app.agents.feasibility_agent import FeasibilityAgent
from backend.app.agents.risk_agent import RiskAgent
from backend.app.agents.report_agent import ReportAgent
from backend.app.agents.scoring_agent import ScoringAgent


def test_market_agent():
    agent = MarketAgent()
    result = agent.analyze("test idea")
    assert result["market_score"] == 85


def test_feasibility_agent():
    agent = FeasibilityAgent()
    result = agent.analyze("test idea")
    assert result["feasibility_score"] == 78


def test_risk_agent():
    agent = RiskAgent()
    result = agent.analyze("test idea")
    assert result["risk_score"] == 65


def test_coordinator_agent():
    agent = CoordinatorAgent()
    result = agent.run("test idea")
    assert "market" in result
    assert "feasibility" in result
    assert "risk" in result


def test_report_agent():
    agent = ReportAgent()
    result = agent.generate_report({}, 85)
    assert result["overall_score"] == 85
    assert result["recommendation"] == "Proceed"


def test_scoring_agent():
    agent = ScoringAgent()
    analysis = {
        "market": {"market_score": 100},
        "feasibility": {"feasibility_score": 100},
        "risk": {"risk_score": 100},
    }
    result = agent.generate_score(analysis)
    assert result == 100.0
