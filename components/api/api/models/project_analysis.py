from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from api.database import Base
from api.schemas.project_analysis import ResponseStatus


class LLMResponse(Base):
    __tablename__ = "llm_responses"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    prompt_type = Column(String, nullable=False)
    response_content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    response_status = Column(String, default=ResponseStatus.IN_PROGRESS, nullable=False)
    project = relationship("Project", back_populates="llm_responses")
