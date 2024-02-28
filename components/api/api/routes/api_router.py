from fastapi import APIRouter

from api.routes import projects, root, users

api_router = APIRouter()

api_router.include_router(root.router, tags=["root"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
