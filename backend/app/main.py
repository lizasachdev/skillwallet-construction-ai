from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .data import architecture, epics, project, skills, system_requirements
from .services.ai_service import analyze_construction_input

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="Multimodal Construction Intelligence Platform API",
    version="1.0.0",
    description="Backend API for the construction intelligence demo.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://skillwallet-construction-ai.vercel.app",
        "https://skillwallet-construction-qtr8f0pcf-skillwallet-construction-ai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "construction-intelligence-api"}


@app.get("/api/project")
def get_project() -> dict[str, Any]:
    return project


@app.get("/api/skills")
def get_skills() -> dict[str, Any]:
    return {"skills": skills}


@app.get("/api/epics")
def get_epics() -> dict[str, Any]:
    return {"epics": epics}


@app.get("/api/architecture")
def get_architecture() -> dict[str, Any]:
    return architecture


@app.get("/api/system-requirements")
def get_system_requirements() -> dict[str, Any]:
    return system_requirements


@app.get("/api/credits")
def get_credits() -> dict[str, Any]:
    return {
        "balance": 1250,
        "earned": 1860,
        "spent": 610,
        "transactions": [
            {"label": "Project analysis", "amount": -120, "date": "Today"},
            {"label": "Skill assessment", "amount": -60, "date": "Yesterday"},
            {"label": "Completed milestone", "amount": 250, "date": "Oct 24"},
        ],
    }


@app.post("/api/ai/analyze")
async def analyze(
    prompt: str = "",
    context: str = "",
    image_name: str | None = None,
) -> dict[str, Any]:
    return analyze_construction_input(prompt, context, image_name)


@app.post("/api/uploads")
async def upload_file(file: UploadFile = File(...)) -> dict[str, Any]:
    safe_name = Path(file.filename or "upload.bin").name
    destination = UPLOAD_DIR / safe_name
    content = await file.read()
    destination.write_bytes(content)

    return {
        "filename": safe_name,
        "size": len(content),
        "message": "File uploaded successfully.",
    }
