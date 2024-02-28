from typing import List, Union

from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Database URL
    database_url: str = "postgresql://api:password@localhost:5432/api"

    # JWT Secret Key
    jwt_secret_key: str = "your_default_secret_key"

    # JWT algorithm
    jwt_algorithm: str = "HS256"

    # API Port
    api_port: int = 8000

    # API Host
    api_host: str = "localhost"

    # List of allowed hosts for CORS
    # You can use AnyHttpUrl to ensure you get a proper URL format
    cors_allowed_hosts: List[Union[str, AnyHttpUrl]] = ["*"]

    @validator("cors_allowed_hosts", pre=True)
    def assemble_cors_allowed_hosts(cls, v: Union[str, List[str]]):
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError("Invalid cors_allowed_hosts")

    google_api_key: str = "your_google_api_key"

    llm_response_dir_path: str = "./generated/llm-responses"


settings = Settings()
