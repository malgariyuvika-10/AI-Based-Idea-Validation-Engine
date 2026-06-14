from app.agents.market_agent import MarketAgent
from app.agents.feasibility_agent import FeasibilityAgent
from app.agents.risk_agent import RiskAgent


class CoordinatorAgent:
    def run(self, idea):

        market_result = MarketAgent().analyze(idea)

        feasibility_result = FeasibilityAgent().analyze(idea)

        risk_result = RiskAgent().analyze(idea)

        return {
            "market": market_result,
            "feasibility": feasibility_result,
            "risk": risk_result,
        }
