# Multimodal Construction Intelligence Platform

A runnable full-stack starter implementation based on the project screens and requirements shown in the provided references.

## Stack
- Frontend: React + Vite
- Backend: FastAPI + SQLite
- Styling: plain CSS
- AI: provider-agnostic endpoint with a deterministic demo mode; optional OpenAI-compatible integration can be added later
- Uploads: local file storage for demo purposes

## Included modules
1. Dashboard
2. Project overview / progress
3. Skill Bank
4. Skill Wallet
5. Skill Card
6. Skill Credits
7. Construction Planning & Evaluation
8. AI Intelligence Layer
9. Assistant & Advisory Engine
10. Image-based analysis
11. Interface / deployment status
12. Technical architecture
13. System requirements
14. REST API + SQLite persistence

## Requirements
- Node.js 20+
- Python 3.10+
- npm

## Run backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend: http://localhost:8000
Swagger: http://localhost:8000/docs

## Run frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Optional AI configuration

Copy `backend/.env.example` to `backend/.env`.

The application works without an API key. In demo mode, the backend returns a useful structured analysis so the complete UI can be tested locally.

If you later add an OpenAI-compatible provider, replace the implementation in `backend/app/services/ai_service.py`.

## Demo login

No authentication is required in this starter. The app opens directly into the dashboard.

## Main project route

`/project/construction-intelligence`

## API endpoints

- `GET /api/health`
- `GET /api/project`
- `GET /api/skills`
- `GET /api/epics`
- `GET /api/architecture`
- `GET /api/system-requirements`
- `GET /api/credits`
- `POST /api/ai/analyze`
- `POST /api/uploads`

## Production hardening still needed

- Authentication / RBAC
- Object storage instead of local uploads
- PostgreSQL
- Background jobs / queues
- Real multimodal LLM provider
- Virus scanning for uploads
- Audit logs
- Rate limiting
- HTTPS and secret management
- Real CI/CD and cloud deployment
