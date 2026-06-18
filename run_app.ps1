# This script starts both the Backend and Frontend together.

# 1. Start the Backend (in a new window)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; ..\venv\Scripts\activate; python -m uvicorn  backend.app.main:app --reload"

# 2. Start the Frontend (in this window)
cd frontend
npm install  # Ensure dependencies are installed
npm run dev
