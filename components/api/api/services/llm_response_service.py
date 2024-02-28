from sqlalchemy.orm import Session

from api.models.project_analysis import LLMResponse
from api.schemas.project_analysis import PromptType


def create_response(
    db: Session, project_id: int, prompt_type: PromptType, response_content: str
):
    db_llm_response = LLMResponse(
        project_id=project_id,
        prompt_type=prompt_type,
        response_content=response_content,
    )
    db.add(db_llm_response)
    db.commit()
    return db_llm_response


def get_latest_response(db: Session, project_id: int, prompt_type: PromptType):
    return (
        db.query(LLMResponse)
        .filter(
            LLMResponse.project_id == project_id, LLMResponse.prompt_type == prompt_type
        )
        .order_by(LLMResponse.id.desc())
        .first()
    )
