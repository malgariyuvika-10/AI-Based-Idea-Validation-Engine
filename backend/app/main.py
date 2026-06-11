from fastapi import FastAPI

from app.api.idea_routes import router as idea_router
from app.api.validation_routes import router as validation_router
from app.api.report_routes import router as report_router

app = FastAPI(
    title="AI Idea Validation Engine",
    version="1.0.0"
)

app.include_router(
    idea_router,
    prefix="/api",
    tags=["Ideas"]
)

app.include_router(
    validation_router,
    prefix="/api",
    tags=["Validation"]
)

app.include_router(
    report_router,
    prefix="/api",
    tags=["Reports"]
)

@app.get("/")
def home():
    return {
        "message": "AI Idea Validation Engine Backend Running"
    }