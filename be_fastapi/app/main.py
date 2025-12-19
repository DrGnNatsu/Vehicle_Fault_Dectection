import uvicorn
from fastapi import FastAPI

from app.api.v1 import api_router
from app.core.config import settings
from app.core.cors import setup_cors
from app.exception.base_exception import AppException
from app.exception.handlers import app_exception_handler

from app.api import assignments, sources

app = FastAPI(
    title="Vehicle Fault Detection API",
    description="Backend API for Vehicle Fault Detection System",
    version="1.0.0"
)



# Allow CORS
setup_cors(app)

# Include routers
app.add_exception_handler(AppException, app_exception_handler)
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(assignments.router)
app.include_router(sources.router)

@app.get("/")
def root():
    return {"message": "FastAPI is  running"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True)
