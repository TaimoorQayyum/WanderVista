"""WanderVista — FastAPI RAG chatbot backend.

Run:
    cd backend
    python3.11 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""
from dotenv import load_dotenv
from pathlib import Path

# Load env from backend/.env or project root .env.local
load_dotenv()
load_dotenv(Path(__file__).resolve().parent.parent / ".env.local")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat

app = FastAPI(title="WanderVista API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "WanderVista Travel API", "endpoints": ["/chat"]}
