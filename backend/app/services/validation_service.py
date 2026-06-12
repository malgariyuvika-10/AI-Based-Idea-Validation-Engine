from app.agents.coordinator_agent import CoordinatorAgent
from app.agents.scoring_agent import ScoringAgent


class ValidationService:

    def validate(self, idea):

        analysis = CoordinatorAgent().run(idea)

        overall_score = (
            ScoringAgent()
            .generate_score(analysis)
        )

        idea_text = f"{idea.title} {idea.description} {idea.industry}".lower()
        target_audience = idea.target_audience or "early adopters"
        word_count = len(idea.description.split())
        has_ai = "ai" in idea_text or "machine learning" in idea_text
        has_b2b = "business" in idea_text or "b2b" in idea_text or "enterprise" in idea_text
        has_recurring_revenue = idea.revenue_model.lower() in ["marketplace commission", "services", "advertising"]

        innovation_score = min(
            95,
            62 + (12 if has_ai else 0) + (8 if word_count > 25 else 0) + (6 if has_b2b else 0)
        )
        market_score = analysis["market"]["market_score"]
        feasibility_score = analysis["feasibility"]["feasibility_score"]
        risk_score = analysis["risk"]["risk_score"]
        scalability_score = min(
            94,
            68 + (8 if has_recurring_revenue else 0) + (8 if has_ai else 0) + (5 if has_b2b else 0)
        )
        success_probability = round(
            overall_score * 0.55 + innovation_score * 0.2 + scalability_score * 0.15 - risk_score * 0.1,
            2
        )
        success_probability = max(5, min(95, success_probability))

        swot = {
            "strengths": [
                "Clear problem-solution direction",
                "Strong digital product potential" if has_ai else "Can be launched as a focused MVP",
                "Clear monetization path" if has_recurring_revenue else "Flexible monetization options"
            ],
            "weaknesses": [
                "Needs sharper target customer definition",
                "Requires proof of willingness to pay",
                "Execution complexity should be validated with a small pilot"
            ],
            "opportunities": [
                f"Growing demand in the {idea.industry} market",
                "Partnerships can reduce customer acquisition cost",
                "Customer feedback loops can improve retention"
            ],
            "threats": [
                "Existing competitors may copy core features",
                "Customer acquisition costs can rise quickly",
                "Regulatory or data privacy concerns may affect rollout"
            ]
        }

        competitors = [
            {
                "name": f"Established {idea.industry} platforms",
                "positioning": "Broad solutions with mature customer bases",
                "gap": "Often expensive or not tailored to niche early adopters"
            },
            {
                "name": "Manual workflows and spreadsheets",
                "positioning": "Low-cost default alternative",
                "gap": "Slow, inconsistent, and difficult to scale"
            },
            {
                "name": "New AI-first startups",
                "positioning": "Fast-moving products with modern UX",
                "gap": "May lack domain depth and customer trust"
            }
        ]

        suggestions = [
            "Interview 10-15 target users before building the full product.",
            "Create a landing page and measure signups or demo requests.",
            "Define one narrow beachhead customer segment for the MVP.",
            "Track activation, retention, and willingness-to-pay metrics from day one.",
            "Prepare a competitor matrix with pricing, features, and differentiation."
        ]

        pitch = (
            f"{idea.title} helps {target_audience} solve a high-priority problem in "
            f"{idea.industry} through a {idea.revenue_model.lower()} model. The opportunity is "
            f"attractive because the concept shows a {overall_score}/100 validation score, "
            f"{success_probability}% predicted success potential, and clear room to differentiate "
            "through focused execution and customer-driven product development."
        )

        return {
            "analysis": analysis,
            "overall_score": overall_score,
            "scores": {
                "market": market_score,
                "feasibility": feasibility_score,
                "innovation": innovation_score,
                "risk": risk_score,
                "scalability": scalability_score,
                "overall": overall_score
            },
            "swot": swot,
            "competitors": competitors,
            "success_prediction": {
                "probability": success_probability,
                "label": "High" if success_probability >= 75 else "Medium" if success_probability >= 50 else "Low",
                "reason": "Prediction combines market, feasibility, innovation, scalability, and risk signals."
            },
            "ai_suggestions": suggestions,
            "pitch": pitch
        }
