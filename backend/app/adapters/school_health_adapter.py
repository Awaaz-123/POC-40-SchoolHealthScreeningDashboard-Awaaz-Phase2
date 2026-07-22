# Adapter module for School Health Screening Dashboard

import pandas as pd
from app.adapters.mock_data import (
    REGIONS_METADATA, 
    REFERRAL_FUNNEL_STAGES, 
    FLAG_RATES_BY_GRADE, 
    BMI_TRENDS_BY_AGE, 
    SCHOOL_RANKINGS_DATA
)

def get_regions_summary():
    """Returns a list of regions with basic completion metrics"""
    results = []
    for region, meta in REGIONS_METADATA.items():
        results.append({
            "region": region,
            "country": meta["country"],
            "total_schools": meta["total_schools"],
            "target_students": meta["target_students"],
            "screened_students": meta["screened_students"],
            "completion_rate": meta["completion_rate"],
            "why_it_matters": meta["why_it_matters"],
            "power_dynamics": meta["power_dynamics"]
        })
    return results

def get_screening_summary(region: str = None):
    """Calculates overall or region-filtered screening summary metrics"""
    if region and region in REGIONS_METADATA:
        meta = REGIONS_METADATA[region]
        target = meta["target_students"]
        screened = meta["screened_students"]
        comp_rate = meta["completion_rate"]
        why = meta["why_it_matters"]
        power = meta["power_dynamics"]
    else:
        target = sum(m["target_students"] for m in REGIONS_METADATA.values())
        screened = sum(m["screened_students"] for m in REGIONS_METADATA.values())
        comp_rate = round((screened / target) * 100, 1)
        why = "School screening is the earliest, cheapest point to catch treatable conditions — this shows education and health ministries where coverage and follow-through are breaking down."
        power = "Joint governance between Ministries of Education (access to schools) and Ministries of Health (clinical protocols and referral pathways) creates bureaucratic friction, determining whether identified student health conditions lead to timely clinical care or die in referral backlogs."

    return {
        "target_students": target,
        "screened_students": screened,
        "completion_rate": comp_rate,
        "why_it_matters": why,
        "power_dynamics": power,
        "funnel_stages": REFERRAL_FUNNEL_STAGES
    }

def get_bmi_trends():
    return BMI_TRENDS_BY_AGE

def get_flag_rates():
    return FLAG_RATES_BY_GRADE

def get_school_rankings(region: str = None, min_completion: float = 0.0):
    df = pd.DataFrame(SCHOOL_RANKINGS_DATA)
    
    if region:
        df = df[df["region"] == region]
        
    if min_completion > 0:
        df = df[df["screening_completion"] >= min_completion]
        
    return df.to_dict(orient="records")
