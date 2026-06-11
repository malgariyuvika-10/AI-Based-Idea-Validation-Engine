from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Idea(Base):

    __tablename__ = "ideas"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    description = Column(String)

    target_audience = Column(String)

    industry = Column(String)

    revenue_model = Column(String)