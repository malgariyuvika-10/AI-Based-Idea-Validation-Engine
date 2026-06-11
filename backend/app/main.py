from fastapi import FastAPI
from app.api.idea_routes import router as idea_router

app = FastAPI(
    title="AI Idea Validation Engine",
    version="1.0.0"
)

app.include_router(
    idea_router,
    prefix="/api",
    tags=["Ideas"]
)

@app.get("/")
def home():
    return {
        "message": "AI Idea Validation Engine Backend Running"
    }