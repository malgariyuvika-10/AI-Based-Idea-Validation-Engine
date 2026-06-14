from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.idea_routes import router as idea_router
from app.api.validation_routes import router as validation_router
from app.api.report_routes import router as report_router
from app.database.database import engine
from app.database.database import Base
from app.database.migrations import migrate_sqlite_schema

Base.metadata.create_all(bind=engine)
migrate_sqlite_schema(engine)

app = FastAPI(title="AI Idea Validation Engine", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],  # For development, allow all. In production, specify your frontend URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(idea_router, prefix="/api", tags=["Ideas"])

app.include_router(validation_router, prefix="/api", tags=["Validation"])

app.include_router(report_router, prefix="/api", tags=["Reports"])


@app.get("/")
def home():
    return {"message": "AI Idea Validation Engine Backend Running"}
