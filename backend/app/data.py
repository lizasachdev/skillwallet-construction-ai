project = {
    "id": "construction-intelligence",
    "title": "Multimodal Construction Intelligence Platform",
    "category": "Real Estate",
    "type": "Individual",
    "status": "In Progress",
    "progress": 0,
    "description": (
        "The AI-powered Multimodal Construction Intelligence Platform is an "
        "intelligent, full-stack decision-support system designed to assist "
        "construction professionals across planning, execution, and monitoring. "
        "It analyzes textual inputs, construction images, and structured project "
        "data to generate actionable recommendations."
    ),
    "goal": (
        "Reduce human error, improve planning efficiency, and provide context-aware "
        "construction intelligence through a React frontend and FastAPI backend."
    ),
    "stack": ["Python", "FastAPI", "React", "HTML5", "CSS", "LLM"],
    "mentor": None,
    "stats": {"epics": 9, "stories": 18, "subtasks": 0},
}

skills = [
    {"name": "Python", "type": "Programming Language", "level": "Advanced"},
    {"name": "Prompt Engineering", "type": "AI", "level": "Intermediate"},
    {"name": "HTML5", "type": "Frontend", "level": "Intermediate"},
    {"name": "CSS Frameworks", "type": "Frontend", "level": "Intermediate"},
    {"name": "FastAPI", "type": "Backend", "level": "Intermediate"},
    {"name": "React.js", "type": "Frontend", "level": "Intermediate"},
    {"name": "Large Language Modeling", "type": "AI", "level": "Intermediate"},
]

epics = [
    {
        "id": 1,
        "title": "Requirements Specification and Environment Setup",
        "status": "Planned",
        "progress": 0,
        "tasks": 2,
    },
    {
        "id": 2,
        "title": "Image-Based Analysis Module",
        "status": "Planned",
        "progress": 0,
        "tasks": 2,
    },
    {
        "id": 3,
        "title": "Construction Planning and Evaluation Module",
        "status": "Planned",
        "progress": 0,
        "tasks": 3,
    },
    {
        "id": 4,
        "title": "AI Intelligence Layer Implementation",
        "status": "Planned",
        "progress": 0,
        "tasks": 3,
    },
    {
        "id": 5,
        "title": "Assistant and Advisory Engine Development",
        "status": "Planned",
        "progress": 0,
        "tasks": 2,
    },
    {
        "id": 6,
        "title": "Interface, Testing, and Deployment",
        "status": "Planned",
        "progress": 0,
        "tasks": 3,
    },
    {
        "id": 7,
        "title": "Data Contracts and Project Knowledge",
        "status": "Planned",
        "progress": 0,
        "tasks": 1,
    },
    {
        "id": 8,
        "title": "Security, Observability, and QA",
        "status": "Planned",
        "progress": 0,
        "tasks": 1,
    },
    {
        "id": 9,
        "title": "Release Readiness and Documentation",
        "status": "Planned",
        "progress": 0,
        "tasks": 1,
    },
]

architecture = {
    "layers": [
        {
            "title": "User Interface",
            "items": ["React Web App", "Dashboard", "Project Workspace", "Upload & Analysis"],
        },
        {
            "title": "API / Application",
            "items": ["FastAPI", "Project Service", "Upload Service", "AI Orchestrator"],
        },
        {
            "title": "AI Intelligence",
            "items": ["Prompt Layer", "Multimodal Analysis", "Planning Engine", "Advisory Engine"],
        },
        {
            "title": "Data & Integrations",
            "items": ["SQLite/PostgreSQL", "Object Storage", "LLM Provider", "Future BIM/GIS APIs"],
        },
    ]
}

system_requirements = {
    "hardware": [
        "Intel Core i5 (8th Gen) or AMD Ryzen 5 or equivalent",
        "RAM: minimum 8 GB; recommended 16 GB",
        "Storage: 256 GB SSD minimum",
        "Stable internet connection; 10 Mbps minimum",
    ],
    "software": [
        "Windows 10/11, macOS or Linux",
        "Modern browser: Chrome, Firefox, Edge or Safari",
        "Python 3.10+",
        "Node.js 20+ and npm",
        "VS Code or another preferred IDE",
        "Git",
    ],
}
