from datetime import date
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel

from api.schemas.user import UserDisplay


class TeamMemberAdd(BaseModel):
    user_id: int
    role: str


class TeamMemberDisplay(BaseModel):
    project_id: int
    user: UserDisplay
    role: str

    class Config:
        from_attributes = True


class ProjectStatus(str, Enum):
    IN_PROGRESS = "IN_PROGRESS"
    CLOSED = "CLOSED"


class ProjectCreate(BaseModel):
    name: str
    bid_owner_id: int
    client_name: str
    business_unit: str
    status: Optional[str] = ProjectStatus.IN_PROGRESS
    open_date: date
    close_date: Optional[date] = None
    team_members: List[TeamMemberAdd] = []


class DocumentBase(BaseModel):
    file_name: str


class DocumentDisplay(DocumentBase):
    id: int


class ProjectDisplay(BaseModel):
    id: int
    name: str
    client_name: str
    bid_owner: UserDisplay
    business_unit: str
    status: str
    open_date: date
    close_date: Optional[date] = None
    documents: List[DocumentDisplay] = []
    team_members: List[TeamMemberDisplay] = []

    class Config:
        from_attributes = True


class ProjectSummaryDisplay(BaseModel):
    id: int
    name: str
    client_name: str
    bid_owner_id: int
    business_unit: str
    status: str
    open_date: date
    close_date: Optional[date] = None

    class Config:
        from_attributes = True
