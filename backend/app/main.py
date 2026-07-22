from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import pandas as pd
import io
import json

from app.adapters.school_health_adapter import (
    get_regions_summary,
    get_screening_summary,
    get_bmi_trends,
    get_flag_rates,
    get_school_rankings
)
from app.adapters.mock_data import SCHOOL_RANKINGS_DATA

app = FastAPI(
    title="Real Rails School Health Screening API",
    description="Backend API serving Gulf student vision, hearing, dental, and BMI screening statistics and referral completion metrics.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "school-health-screening-backend"}

@app.get("/api/regions")
def get_regions():
    return get_regions_summary()

@app.get("/api/screening-summary")
def screening_summary(region: str = Query(None, description="Optional region/emirate filter")):
    return get_screening_summary(region=region)

@app.get("/api/bmi-trends")
def bmi_trends():
    return get_bmi_trends()

@app.get("/api/flag-rates")
def flag_rates():
    return get_flag_rates()

@app.get("/api/school-rankings")
def school_rankings(
    region: str = Query(None, description="Region filter"),
    min_completion: float = Query(0.0, description="Minimum completion rate %")
):
    return get_school_rankings(region=region, min_completion=min_completion)

@app.get("/api/download")
def download_data(format: str = "csv"):
    df = pd.DataFrame(SCHOOL_RANKINGS_DATA)
    
    if format.lower() == "json":
        json_buffer = io.StringIO()
        df.to_json(json_buffer, orient="records", indent=2)
        json_buffer.seek(0)
        return StreamingResponse(
            io.BytesIO(json_buffer.getvalue().encode()),
            media_type="application/json",
            headers={"Content-Disposition": "attachment; filename=school_health_screening_data.json"}
        )
        
    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)
    return StreamingResponse(
        io.BytesIO(csv_buffer.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=school_health_screening_data.csv"}
    )
