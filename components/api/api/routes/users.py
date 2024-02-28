from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import api.services.user_service as user_service
from api.database import get_db
from api.schemas.generic_responses import HTTPErrorResponse
from api.schemas.user import LoginSuccessResponse, UserCreate, UserDisplay, UserLogin

router = APIRouter()


@router.post(
    "/register",
    response_model=UserDisplay,
    responses={400: {"model": HTTPErrorResponse}},
)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )
    created_user = user_service.create_user(db, user)
    return created_user


@router.get("/", response_model=List[UserDisplay])
def get_users(db: Session = Depends(get_db)):
    users = user_service.get_users(db)
    return users


@router.post(
    "/login",
    response_model=LoginSuccessResponse,
    responses={401: {"model": HTTPErrorResponse}},
)
def login(user: UserLogin, db: Session = Depends(get_db)):
    user_token = user_service.authenticate_user(db, user.email, user.password)
    if user_token:
        return LoginSuccessResponse(token=user_token)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
    )


@router.post(
    "/sso-login",
    response_model=LoginSuccessResponse,
    responses={401: {"model": HTTPErrorResponse}},
)
def sso_login(user: UserLogin, db: Session = Depends(get_db)):
    user_token = user_service.authenticate_user_sso(db, user.email, user.password)
    if user_token:
        return LoginSuccessResponse(token=user_token)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
    )
