from fastapi import APIRouter
from api.v1 import auth_api, sources, assignments, rules, zones, violations, users, alerts

# 1. Create one Master Router
api_router = APIRouter()

# 2. Register all feature routers here
api_router.include_router(auth_api.router)
api_router.include_router(sources.router)
api_router.include_router(assignments.router)
api_router.include_router(rules.router)
api_router.include_router(zones.router)
api_router.include_router(violations.router)
api_router.include_router(users.router)
api_router.include_router(alerts.router)