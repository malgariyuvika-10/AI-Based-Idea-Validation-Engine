from fastapi import FastAPI

app = FastAPI(
    title="AI Idea Validation Engine",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "AI Idea Validation Engine Backend Running"
    }