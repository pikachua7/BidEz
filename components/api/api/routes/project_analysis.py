from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api.database import get_db
from api.schemas.generic_responses import HTTPErrorResponse
from api.schemas.project_analysis import (
    LLMResponseDisplay,
    RequirementExplanationRequest,
    SRSOutputFormat,
)
from api.services import project_analysis_service

router = APIRouter()


@router.get("/client-profile", response_model=LLMResponseDisplay)
def get_client_profile(project_id: int, db: Session = Depends(get_db)):
    try:
        return project_analysis_service.get_client_profile(db, project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/requirements-spec",
    response_model=LLMResponseDisplay,
)
def get_requirements_spec(
    project_id: int,
    format: SRSOutputFormat,
    db: Session = Depends(get_db),
):
    try:
        return project_analysis_service.get_requirements_spec(db, project_id, format)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/requirement-explanation")
def get_requirement_explanation(
    project_id: int,
    rqmt_expl_request: RequirementExplanationRequest,
    db: Session = Depends(get_db),
):
    try:
        return project_analysis_service.get_requirement_explanation(
            db, project_id, rqmt_expl_request.requirement
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/requirement-personas",
    response_model=LLMResponseDisplay,
    responses={400: {"model": HTTPErrorResponse}},
)
def get_requirement_personas(project_id: int, db: Session = Depends(get_db)):
    try:
        return project_analysis_service.get_requirement_personas(db, project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/business-flows",
    response_model=LLMResponseDisplay,
    responses={400: {"model": HTTPErrorResponse}},
)
def get_business_flows(project_id: int, db: Session = Depends(get_db)):
    try:
        return project_analysis_service.get_business_flows(db, project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/tech-stack",
    response_model=LLMResponseDisplay,
    responses={400: {"model": HTTPErrorResponse}},
)
def get_tech_stack(project_id: int, db: Session = Depends(get_db)):
    try:
        return project_analysis_service.get_tech_stack(db, project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get(
    "/effort-estimates",
    response_model=LLMResponseDisplay,
)
def get_effort_estimates(project_id: int, db: Session = Depends(get_db)):
    try:
        return project_analysis_service.get_effort_estimates(db, project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/required-architecture-types")
def get_architecture_suggestions(project_id: int, db: Session = Depends(get_db)):
    try:
        return project_analysis_service.get_architecture_suggestions(db, project_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/architecture-mermaid-script")
def get_architecture_diagram(
    project_id: int,
    db: Session = Depends(get_db),
):
    try:
        return project_analysis_service.get_architecture_diagram(
            db, project_id
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return 
