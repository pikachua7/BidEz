from pydantic import BaseModel, EmailStr


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Userbase(BaseModel):
    email: EmailStr
    firstname: str
    lastname: str


class UserCreate(Userbase):
    password: str


class UserDisplay(Userbase):
    id: int

    class Config:
        from_attributes = True


class LoginSuccessResponse(BaseModel):
    token: str
