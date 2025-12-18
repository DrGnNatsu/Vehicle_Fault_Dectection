import uvicorn
from fastapi import FastAPI

from app.api.v1 import api_router
from app.core.config import settings
from app.exception.base_exception import AppException
from app.exception.handlers import app_exception_handler

app = FastAPI(title="Traffic System", version="1.0.0")
app.add_exception_handler(AppException, app_exception_handler)
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Database service running"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True)
