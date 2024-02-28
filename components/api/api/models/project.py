from sqlalchemy import Column, Date, ForeignKey, Integer, LargeBinary, String
from sqlalchemy.orm import relationship

from api.database import Base
from api.schemas.project import ProjectStatus


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    client_name = Column(String, nullable=False)
    bid_owner_id = Column(Integer, ForeignKey("users.id"))
    bid_owner = relationship("User")
    business_unit = Column(String, nullable=False)
    status = Column(String, default=ProjectStatus.IN_PROGRESS)
    open_date = Column(Date, nullable=False)
    close_date = Column(Date, nullable=True)
    documents = relationship("Document", back_populates="project")
    team_members = relationship("ProjectTeamMember", back_populates="project")
    llm_responses = relationship(
        "LLMResponse", back_populates="project", cascade="all, delete-orphan"
    )


class ProjectTeamMember(Base):
    __tablename__ = "project_team_members"

    project_id = Column(Integer, ForeignKey("projects.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    role = Column(String)
    project = relationship("Project", back_populates="team_members")
    user = relationship("User")


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    file_name = Column(String, nullable=False)
    file_data = Column(LargeBinary, nullable=False)
    project = relationship("Project", back_populates="documents")
