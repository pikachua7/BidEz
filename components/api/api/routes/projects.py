from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from api.database import get_db
from api.routes import project_analysis
from api.schemas.generic_responses import HTTPErrorResponse, HTTPSuccessResponse
from api.schemas.project import (
    ProjectCreate,
    ProjectDisplay,
    ProjectSummaryDisplay,
    TeamMemberAdd,
)
from api.services import project_service
from api.utils.files import create_temp_file

router = APIRouter()


@router.post(
    "/", response_model=ProjectDisplay, responses={400: {"model": HTTPErrorResponse}}
)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    try:
        project = project_service.create_project(db, project)
        return project
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/", response_model=List[ProjectDisplay])
def list_projects(bid_owner_id: int | None = None, db: Session = Depends(get_db)):
    return project_service.get_projects(db, bid_owner_id)


@router.get("/summary", response_model=List[ProjectSummaryDisplay])
def list_projects_summary(
    bid_owner_id: int | None = None, db: Session = Depends(get_db)
):
    return project_service.get_projects(db, bid_owner_id)


@router.get(
    "/{project_id}",
    response_model=ProjectDisplay,
    responses={404: {"model": HTTPErrorResponse}},
)
def view_project_details(project_id: int, db: Session = Depends(get_db)):
    project = project_service.get_project(db, project_id)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project not found"
        )
    return project


@router.post(
    "/{project_id}/team-members",
    response_model=ProjectDisplay,
    responses={400: {"model": HTTPErrorResponse}},
)
def add_team_member(
    project_id: int, team_member: TeamMemberAdd, db: Session = Depends(get_db)
):
    try:
        return project_service.add_team_member(db, project_id, team_member)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post(
    "/{project_id}/documents",
    response_model=ProjectDisplay,
    responses={400: {"model": HTTPErrorResponse}},
)
async def upload_documents(
    project_id: int, files: List[UploadFile], db: Session = Depends(get_db)
):
    try:
        project = await project_service.upload_documents(db, project_id, files)
        return project
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/{project_id}/documents/{document_id}/download",
    responses={
        200: {
            "content": {"application/octet-stream": {}},
            "description": "Returns the document file.",
        },
        404: {"model": HTTPErrorResponse},
    },
)
def download_document(project_id: int, document_id: int, db: Session = Depends(get_db)):
    document = project_service.get_document_by_id(db, project_id, document_id)
    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Document not found"
        )
    file_path = create_temp_file(document.file_name, document.file_data)
    return FileResponse(file_path)


@router.delete(
    "/{project_id}/documents/{document_id}",
    response_model=HTTPSuccessResponse,
    responses={404: {"model": HTTPErrorResponse}},
)
def delete_document(project_id: int, document_id: int, db: Session = Depends(get_db)):
    deleted = project_service.delete_document(db, project_id, document_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Document not found"
        )
    return HTTPSuccessResponse(message="Document deleted successfully")


router.include_router(
    project_analysis.router,
    prefix="/{project_id}/analysis",
    tags=["projects", "analysis"],
)
