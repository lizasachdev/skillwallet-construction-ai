from typing import Any


def _keywords(text: str) -> list[str]:
    known = [
        "crack", "concrete", "foundation", "beam", "column", "slab",
        "water", "leak", "rebar", "reinforcement", "safety", "schedule",
        "cost", "material", "inspection",
    ]
    lowered = text.lower()
    return [item for item in known if item in lowered]


def analyze_construction_input(
    prompt: str,
    context: str,
    image_name: str | None = None,
) -> dict[str, Any]:
    combined = f"{prompt} {context}".strip()
    words = _keywords(combined)

    risks = []
    if any(x in words for x in ["crack", "foundation", "beam", "column", "slab"]):
        risks.append({
            "severity": "High",
            "title": "Structural condition requires inspection",
            "detail": "Potential structural defects were detected from the supplied context. Route the item to a qualified site engineer for verification.",
        })
    if any(x in words for x in ["water", "leak"]):
        risks.append({
            "severity": "Medium",
            "title": "Moisture ingress risk",
            "detail": "Inspect waterproofing, drainage paths, affected finishes, and the source of water before repair work.",
        })
    if "safety" in words:
        risks.append({
            "severity": "High",
            "title": "Safety review required",
            "detail": "Validate site controls, PPE, access, barriers, and permit requirements before proceeding.",
        })

    if not risks:
        risks.append({
            "severity": "Low",
            "title": "No critical issue identified in demo mode",
            "detail": "Provide more project context or upload an inspection image for a more targeted assessment.",
        })

    recommendations = [
        "Capture the affected area with a date, location, and project phase.",
        "Compare the observation against drawings/specifications and recent site records.",
        "Assign the issue to an accountable project role and record a due date.",
        "Re-inspect after corrective action and close only after evidence is attached.",
    ]

    return {
        "mode": "demo",
        "image": image_name,
        "summary": (
            "The platform analyzed the supplied construction context and generated "
            "a structured triage response. This is deterministic demo intelligence; "
            "connect a production multimodal model for real image reasoning."
        ),
        "detected_topics": words,
        "risks": risks,
        "recommendations": recommendations,
        "next_actions": [
            {"owner": "Site Engineer", "action": "Verify the observation on site"},
            {"owner": "Project Manager", "action": "Create or update the issue record"},
            {"owner": "QA/QC", "action": "Attach evidence and verification notes"},
        ],
    }
