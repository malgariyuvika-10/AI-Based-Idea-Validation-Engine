from app.services.scoring_service import ScoringService


class ScoringAgent:

    def generate_score(self, analysis):

        return ScoringService().calculate_score(
            analysis["market"]["market_score"],
            analysis["feasibility"]["feasibility_score"],
            analysis["risk"]["risk_score"]
        )