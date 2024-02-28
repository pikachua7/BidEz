from fastapi import APIRouter

from api.schemas.generic_responses import HTTPSuccessResponse

router = APIRouter()


@router.get("/", response_model=HTTPSuccessResponse)
def read_root():
    return HTTPSuccessResponse(message="Hello World")
