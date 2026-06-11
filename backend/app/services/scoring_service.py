class ScoringService:

    def calculate_score(
        self,
        market_score,
        feasibility_score,
        risk_score
    ):

        overall_score = (
            market_score * 0.4 +
            feasibility_score * 0.4 +
            risk_score * 0.2
        )

        return round(overall_score, 2)