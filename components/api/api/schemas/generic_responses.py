from pydantic import BaseModel


class HTTPErrorResponse(BaseModel):
    detail: str


class HTTPSuccessResponse(BaseModel):
    message: str
