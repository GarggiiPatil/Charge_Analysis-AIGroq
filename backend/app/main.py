from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.llm_service import extract_dates, generate_insights
from app.services.metrics import generate_charge_analysis

app = FastAPI(
    title="Charge Analysis Report API",
    description="LLM-powered charge analysis using SQLite, Pandas, and Groq",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REQUEST / RESPONSE MODELS

class AnalysisRequest(BaseModel):
    query: str

class AnalysisResponse(BaseModel):
    date_range: dict
    summary: dict
    insights: str
    report_table: list

# API ENDPOINT

@app.post("/analyze", response_model=AnalysisResponse)
def analyze_charge_report(request: AnalysisRequest):
    try:
        # 1. Extract dates using LLM
        dates = extract_dates(request.query)

        start_date = dates.get("start_date")
        end_date = dates.get("end_date")

        if not start_date or not end_date:
            raise ValueError("Invalid date extraction")

        # 2. Generate metrics
        report = generate_charge_analysis(start_date, end_date)

        # 3. Generate insights
        insights = generate_insights(
            report["summary"],
            start_date,
            end_date
        )

        return {
            "date_range": report["date_range"],
            "summary": report["summary"],
            "insights": insights,
            "report_table": report["report_table"]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))