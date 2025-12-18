from fastapi import APIRouter
from app.api.v1 import auth

# 1. Create one Master Router
api_router = APIRouter()

# 2. Register all feature routers here
api_router.include_router(auth.router)