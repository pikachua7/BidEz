from datetime import datetime
from enum import Enum

from pydantic import BaseModel


class RequirementExplanationRequest(BaseModel):
    requirement: str


class ArchitectureDiagramCriteria(BaseModel):
    criteria: list[str]


class SRSOutputFormat(str, Enum):
    ISO_IEC_25010 = "ISO_IEC_25010"
    IEEE_29141 = "IEEE_29141"


srs_format_enum_to_str = {
    SRSOutputFormat.ISO_IEC_25010: "ISO/IEC 25010",
    SRSOutputFormat.IEEE_29141: "IEEE 29141",
}


class ResponseStatus(str, Enum):
    IN_PROGRESS = "IN_PROGRESS"
    FINALIZED = "FINALIZED"


class PromptType(str, Enum):
    CLIENT_PROFILE = "CLIENT_PROFILE"
    REQUIREMENTS_SPEC = "REQUIREMENTS_SPEC"
    REQUIREMENTS_EXPLANATION = "REQUIREMENTS_EXPLANATION"
    PERSONAS = "PERSONAS"
    BUSINESS_FLOWS = "BUSINESS_FLOWS"
    TECH_STACK = "TECH_STACK"
    EFFORT_ESTIMATES = "EFFORT_ESTIMATES"
    ARCHITECTURE_SUGGESTIONS = "ARCHITECTURE_SUGGESTIONS"
    ARCHITECTURE_DIAGRAM = "ARCHITECTURE_DIAGRAM"


class LLMResponseDisplay(BaseModel):
    id: int
    project_id: int
    prompt_type: PromptType
    response_content: str
    response_status: ResponseStatus
    created_at: datetime

    class Config:
        from_attributes = True
