from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.routes.ppt_routes import router as ppt_router
from app.services.llm_service import extract_query_filters, generate_detailed_insights
from app.services.metrics import generate_charge_analysis

app = FastAPI(
    title="Charge Analysis Report API",
    description="LLM-powered charge analysis using SQLite, Pandas, and Groq",
    version="1.0.0"
)

# Register routes
app.include_router(ppt_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class AnalysisRequest(BaseModel):
    query: str

class AnalysisResponse(BaseModel):
    date_range: dict
    summary: dict
    insights: str
    report_table: list
    charts: dict

# Analyze endpoint
@app.post("/analyze", response_model=AnalysisResponse)
def analyze_charge_report(request: AnalysisRequest):
    try:
        filters = extract_query_filters(request.query)

        start_date = filters.get("start_date")
        end_date = filters.get("end_date")
        city = filters.get("city")

        if not start_date or not end_date:
            raise ValueError("Start date or end date missing")

        report = generate_charge_analysis(
            start_date=start_date,
            end_date=end_date,
            city=city
        )

        insights = generate_detailed_insights(
            report["report_table"],
            start_date,
            end_date,
            city
        )

        return {
            "date_range": report["date_range"],
            "summary": report["summary"],
            "insights": insights,
            "report_table": report["report_table"],
            "charts": report["charts"]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))