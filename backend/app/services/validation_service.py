from app.agents.coordinator_agent import CoordinatorAgent
from app.agents.scoring_agent import ScoringAgent


class ValidationService:

    def validate(self, idea):

        analysis = CoordinatorAgent().run(idea)

        overall_score = (
            ScoringAgent()
            .generate_score(analysis)
        )

        return {
            "analysis": analysis,
            "overall_score": overall_score
        }