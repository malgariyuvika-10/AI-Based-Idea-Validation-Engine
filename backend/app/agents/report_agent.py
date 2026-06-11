class ReportAgent:

    def generate_report(self, analysis, overall_score):

        recommendation = (
            "Proceed"
            if overall_score >= 80
            else "Proceed with caution"
        )

        return {
            "overall_score": overall_score,
            "recommendation": recommendation,
            "strengths": [
                "Strong market demand",
                "Clear target audience"
            ],
            "weaknesses": [
                "Moderate competition",
                "Technical complexity"
            ],
            "summary":
                "The idea shows promising market potential but requires careful execution."
        }