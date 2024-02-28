from sqlalchemy.orm import Session

from api.schemas.project_analysis import (
    PromptType,
    SRSOutputFormat,
    srs_format_enum_to_str,
)
from api.services import llm_response_service, llm_service, project_service
from api.utils.files import (
    get_pdf_text_from_db_pdf,
    parse_architecture_diagram,
    save_llm_response,
)
from api.utils.prompts import prompt_templates


def get_client_profile(db: Session, project_id: int):
    project = project_service.get_project(db, project_id)
    if not project:
        raise ValueError(f"Project with id {project_id} does not exist")

    client_name = project.client_name
    company_profile_params = [
        "company overview",
        "services and expertise",
        "focus industries",
        "awards and recognition",
        "financial performance",
        "additional resources",
    ]

    prompt = prompt_templates[PromptType.CLIENT_PROFILE].format(
        client_name=client_name, company_profile_params=company_profile_params
    )
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(PromptType.CLIENT_PROFILE.value, llm_response)
    db_llm_response = llm_response_service.create_response(
        db, project_id, PromptType.CLIENT_PROFILE, llm_response
    )
    return db_llm_response


def get_requirements_spec(db: Session, project_id: int, format: SRSOutputFormat):
    # TODO: combine text from all/multiple pdfs for requirement generation
    db_document = project_service.get_first_document(db, project_id)
    if not db_document:
        raise ValueError("Cannot generate requirements spec without a document")
    document_text = get_pdf_text_from_db_pdf(db_document.file_data)

    prompt = prompt_templates[PromptType.REQUIREMENTS_SPEC].format(
        document_text=document_text, format=srs_format_enum_to_str[format]
    )
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(
        f"{PromptType.REQUIREMENTS_SPEC.value}-{format.value}", llm_response
    )

    db_llm_response = llm_response_service.create_response(
        db, project_id, PromptType.REQUIREMENTS_SPEC, llm_response
    )
    return db_llm_response


def get_requirement_explanation(db: Session, project_id: int, requirement: str):

    prompt = prompt_templates[PromptType.REQUIREMENTS_EXPLANATION].format(
        requirement=requirement
    )
    llm_response = llm_service.invoke_llm_with_initial_history(prompt)
    return llm_response


def get_requirement_personas(db: Session, project_id: int):
    prompt = prompt_templates[PromptType.PERSONAS]
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(PromptType.PERSONAS.value, llm_response)
    db_llm_response = llm_response_service.create_response(
        db, project_id, PromptType.PERSONAS, llm_response
    )
    return db_llm_response


def get_business_flows(db: Session, project_id: int):
    prompt = prompt_templates[PromptType.BUSINESS_FLOWS]
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(PromptType.BUSINESS_FLOWS.value, llm_response)
    db_llm_response = llm_response_service.create_response(
        db, project_id, PromptType.BUSINESS_FLOWS, llm_response
    )
    return db_llm_response


def get_tech_stack(db: Session, project_id: int):
    prompt = prompt_templates[PromptType.TECH_STACK]
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(PromptType.TECH_STACK.value, llm_response)
    db_llm_response = llm_response_service.create_response(
        db, project_id, PromptType.TECH_STACK, llm_response
    )
    return db_llm_response


def get_effort_estimates(db: Session, project_id: int):
    prompt = prompt_templates[PromptType.EFFORT_ESTIMATES]
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(PromptType.EFFORT_ESTIMATES.value, llm_response)
    db_llm_response = llm_response_service.create_response(
        db, project_id, PromptType.EFFORT_ESTIMATES, llm_response
    )
    return db_llm_response


def get_architecture_suggestions(db: Session, project_id: int):
    prompt = prompt_templates[PromptType.ARCHITECTURE_SUGGESTIONS]
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(PromptType.ARCHITECTURE_SUGGESTIONS.value, llm_response)
    llm_response_service.create_response(
        db, project_id, PromptType.ARCHITECTURE_SUGGESTIONS, llm_response
    )
    return llm_response


def get_architecture_diagram(
    db: Session, project_id: int
):
    
    prompt = prompt_templates[PromptType.ARCHITECTURE_DIAGRAM]
    llm_response = llm_service.invoke_llm(prompt)
    save_llm_response(PromptType.ARCHITECTURE_DIAGRAM.value, llm_response, "mmd")
    llm_response_service.create_response(
        db, project_id, PromptType.ARCHITECTURE_DIAGRAM, llm_response
    )
    parsed_response = parse_architecture_diagram(llm_response)
    print('parsed_response', parsed_response)
    return parsed_response
