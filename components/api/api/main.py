from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes.api_router import api_router
from api.settings import settings

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_hosts,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: add logging

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=settings.api_host, port=settings.api_port)
