from typing import List

from fastapi import UploadFile
from sqlalchemy.orm import Session

from api.models.project import Document, Project, ProjectTeamMember
from api.schemas.project import ProjectCreate, TeamMemberAdd
from api.services.user_service import get_user


def create_project(db: Session, project: ProjectCreate):
    db_user = get_user(db, project.bid_owner_id)
    if not db_user:
        raise ValueError(f"User with id {project.bid_owner_id} does not exist")
    db_project = Project(**project.model_dump(exclude={"team_members"}))
    for member in project.team_members:
        db_team_member = get_user(db, member.user_id)
        if not db_team_member:
            raise ValueError(f"User with id {member.user_id} does not exist")
        project_team_member = ProjectTeamMember(
            project=db_project, user=db_team_member, role=member.role
        )
        db_project.team_members.append(project_team_member)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def get_projects(db: Session, bid_owner_id: int | None = None):
    if bid_owner_id:
        return (
            db.query(Project)
            .filter(Project.bid_owner_id == bid_owner_id)
            .order_by(Project.id.desc())
            .all()
        )
    return db.query(Project).order_by(Project.id.desc()).all()


def get_project(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()


def get_project_team_member_by_id(db: Session, project_id: int, team_member_id: int):
    return (
        db.query(ProjectTeamMember)
        .filter(
            ProjectTeamMember.project_id == project_id,
            ProjectTeamMember.user_id == team_member_id,
        )
        .first()
    )


def add_team_member(db: Session, project_id: int, team_member: TeamMemberAdd):
    db_project = get_project(db, project_id)
    if not db_project:
        raise ValueError(f"Project with id {project_id} does not exist")
    if get_project_team_member_by_id(db, project_id, team_member.user_id):
        raise ValueError(f"User with id {team_member.user_id} is already a team member")
    db_team_member = get_user(db, team_member.user_id)
    if not db_team_member:
        raise ValueError(f"User with id {team_member.user_id} does not exist")
    project_team_member = ProjectTeamMember(
        project=db_project, user=db_team_member, role=team_member.role
    )
    db_project.team_members.append(project_team_member)
    db.commit()
    return db_project


async def upload_documents(db: Session, project_id: int, files: List[UploadFile]):
    project = get_project(db, project_id)
    if not project:
        raise ValueError(f"Project with id {project_id} does not exist")
    for file in files:
        file_data = await file.read()
        db_document = Document(
            project_id=project_id, file_name=file.filename, file_data=file_data
        )
        db.add(db_document)
    db.commit()
    db.refresh(project)
    return project


def get_document_by_id(db: Session, project_id: int, document_id: int):
    document = (
        db.query(Document)
        .filter(Document.project_id == project_id, Document.id == document_id)
        .first()
    )
    return document


def get_first_document(db: Session, project_id: int):
    document = db.query(Document).filter(Document.project_id == project_id).first()
    return document


def delete_document(db: Session, project_id: int, document_id: int):
    document = (
        db.query(Document)
        .filter(Document.project_id == project_id, Document.id == document_id)
        .first()
    )
    if not document:
        return False
    db.delete(document)
    db.commit()
    return True
