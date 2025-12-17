from fastapi import FastAPI
import uvicorn
from app.api import assignments, sources

app = FastAPI(
    title="Vehicle Fault Detection API",
    description="Backend API for Vehicle Fault Detection System",
    version="1.0.0"
)

# Include routers
app.include_router(assignments.router)
app.include_router(sources.router)

@app.get("/")
def root():
    return {"message": "Database service running"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True)