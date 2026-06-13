from sqlalchemy import Column, Integer, String, Float, Text

from app.database.database import Base


class Idea(Base):

    __tablename__ = "ideas"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    target_audience = Column(String)
    industry = Column(String)
    revenue_model = Column(String)
    provider = Column(String, default="local")

    # Validation Results
    market_score = Column(Integer, default=0)
    market_summary = Column(Text, nullable=True)
    feasibility_score = Column(Integer, default=0)
    feasibility_summary = Column(Text, nullable=True)
    risk_score = Column(Integer, default=0)
    risk_summary = Column(Text, nullable=True)
    overall_score = Column(Float, default=0.0)

    recommendation = Column(String, nullable=True)
    strengths = Column(Text, nullable=True)  # Stored as text/JSON
    weaknesses = Column(Text, nullable=True)
    analysis_summary = Column(Text, nullable=True)