from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.idea_routes import router as idea_router
from backend.app.api.validation_routes import router as validation_router
from backend.app.api.report_routes import router as report_router

from backend.app.database.database import engine, Base
from backend.app.database.migrations import migrate_sqlite_schema

Base.metadata.create_all(bind=engine)
migrate_sqlite_schema(engine)

app = FastAPI(title="AI Idea Validation Engine", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(idea_router, prefix="/api", tags=["Ideas"])

app.include_router(validation_router, prefix="/api", tags=["Validation"])

app.include_router(report_router, prefix="/api", tags=["Reports"])


@app.get("/")
def home():
    return {"message": "AI Idea Validation Engine Backend Running"}
