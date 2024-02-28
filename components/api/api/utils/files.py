import os
from datetime import datetime
from io import BytesIO

from PyPDF2 import PdfReader

from api.settings import settings


def create_temp_file(file_name: str, file_data: bytes):
    temp_files_dir = "/tmp/fastAPI-temp-files"
    os.makedirs(temp_files_dir, exist_ok=True)
    temp_file_path = os.path.join(temp_files_dir, file_name)
    with open(temp_file_path, "wb") as temp_file:
        temp_file.write(file_data)
    return temp_file_path


def save_llm_response(file_name: str, file_data: str, file_extension: str = "md"):
    os.makedirs(settings.llm_response_dir_path, exist_ok=True)
    file_path = os.path.join(
        settings.llm_response_dir_path,
        f"{file_name}-{datetime.utcnow().strftime('%Y-%m-%d_%H-%M-%S')}.{file_extension}",
    )
    with open(file_path, "w") as file:
        file.write(file_data)
    return file_path


def get_saved_llm_response(file_name: str):
    file_path = os.path.join(settings.llm_response_dir_path, file_name)
    content: str
    with open(file_path, "r") as file:
        content = file.read()
    return content


def get_pdf_text_from_db_pdf(pdf_bytes):
    text = ""
    pdf_stream = BytesIO(pdf_bytes)
    pdf_reader = PdfReader(pdf_stream)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text


def parse_architecture_diagram(response: str):
    leading_pattern = "```mermaid"
    trailing_pattern = "```"

    start = response.find(leading_pattern) + len(leading_pattern)
    end = response.rfind(trailing_pattern)

    return response[start:end]
