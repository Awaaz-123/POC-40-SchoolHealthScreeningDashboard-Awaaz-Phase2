# Mock Data for PoC #40: School Health Screening Dashboard

REGIONS_METADATA = {
    "Dubai": {
        "country": "UAE",
        "total_schools": 220,
        "target_students": 310000,
        "screened_students": 288300,
        "completion_rate": 93.0,
        "why_it_matters": "High-density private and public school network with mandated annual screening; tracking follow-through ensures early detection of refractive vision errors and childhood caries before academic performance suffers.",
        "power_dynamics": "Joint oversight between Dubai Health Authority (DHA) and Knowledge and Human Development Authority (KHDA) requires aligned protocols between health regulators and private school operators."
    },
    "Abu Dhabi": {
        "country": "UAE",
        "total_schools": 260,
        "target_students": 380000,
        "screened_students": 349600,
        "completion_rate": 92.0,
        "why_it_matters": "Extensive screening across urban centers and Al Ain / Al Dhafra regions; critical for detecting early hearing deficits and metabolic risks in younger cohorts.",
        "power_dynamics": "Department of Health Abu Dhabi (DoH) mandates strict EMR integration for school clinics, placing compliance responsibility directly on licensed school nurses."
    },
    "Sharjah": {
        "country": "UAE",
        "total_schools": 140,
        "target_students": 185000,
        "screened_students": 160950,
        "completion_rate": 87.0,
        "why_it_matters": "Rapidly growing student population; identifying referral drop-offs between primary school screenings and secondary care prevents irreversible vision loss.",
        "power_dynamics": "Ministry of Health and Prevention (MOHAP) coordinates screening alongside Sharjah Private Education Authority (SPEA)."
    },
    "Riyadh": {
        "country": "Saudi Arabia",
        "total_schools": 480,
        "target_students": 620000,
        "screened_students": 545600,
        "completion_rate": 88.0,
        "why_it_matters": "Massive student volume; early BMI screening and dental interventions address rising childhood obesity and oral health burdens across the central region.",
        "power_dynamics": "Saudi Ministry of Health (MOH) and Ministry of Education (MOE) co-manage the National School Health Program, navigating cross-ministerial referral pipelines."
    },
    "Makkah & Jeddah": {
        "country": "Saudi Arabia",
        "total_schools": 410,
        "target_students": 540000,
        "screened_students": 459000,
        "completion_rate": 85.0,
        "why_it_matters": "Diverse socio-demographic student body; robust vision screening catches amblyopia early when corrective intervention is most cost-effective.",
        "power_dynamics": "Regional Health Clusters drive clinical referrals while school principals control access to physical screening days."
    },
    "Eastern Province": {
        "country": "Saudi Arabia",
        "total_schools": 310,
        "target_students": 410000,
        "screened_students": 364900,
        "completion_rate": 89.0,
        "why_it_matters": "Industrial and coastal corridor; tracking referral-to-treatment loops guarantees students flagged for hearing loss receive specialized audiometry.",
        "power_dynamics": "School health units rely on primary healthcare center (PHCC) capacity to process student referrals promptly."
    }
}

# Referral to Treatment Funnel Data (Overall Aggregated Stage Counts)
REFERRAL_FUNNEL_STAGES = [
    {"stage": "Target Students", "count": 2445000, "percentage": 100.0, "fill": "#38BDF8"},
    {"stage": "Screening Completed", "count": 2168350, "percentage": 88.7, "fill": "#818CF8"},
    {"stage": "Identified / Flagged", "count": 390300, "percentage": 18.0, "fill": "#F59E0B"},
    {"stage": "Referred to Clinic", "count": 321500, "percentage": 82.4, "fill": "#EC4899"},
    {"stage": "Treatment Completed", "count": 218620, "percentage": 68.0, "fill": "#10B981"}
]

# Flag Rate by Grade (Vision, Hearing, Dental, BMI)
FLAG_RATES_BY_GRADE = [
    {"grade": "Grade 1", "age": 6, "vision_flag": 6.2, "hearing_flag": 3.1, "dental_flag": 24.5, "bmi_flag": 14.2},
    {"grade": "Grade 2", "age": 7, "vision_flag": 7.4, "hearing_flag": 2.8, "dental_flag": 26.1, "bmi_flag": 15.8},
    {"grade": "Grade 3", "age": 8, "vision_flag": 8.9, "hearing_flag": 2.5, "dental_flag": 28.4, "bmi_flag": 17.5},
    {"grade": "Grade 4", "age": 9, "vision_flag": 10.5, "hearing_flag": 2.3, "dental_flag": 30.2, "bmi_flag": 19.1},
    {"grade": "Grade 5", "age": 10, "vision_flag": 12.1, "hearing_flag": 2.1, "dental_flag": 31.8, "bmi_flag": 21.4},
    {"grade": "Grade 6", "age": 11, "vision_flag": 13.8, "hearing_flag": 2.0, "dental_flag": 29.5, "bmi_flag": 23.8},
    {"grade": "Grade 7", "age": 12, "vision_flag": 15.6, "hearing_flag": 1.9, "dental_flag": 27.2, "bmi_flag": 25.6},
    {"grade": "Grade 8", "age": 13, "vision_flag": 17.2, "hearing_flag": 1.8, "dental_flag": 25.0, "bmi_flag": 27.2},
    {"grade": "Grade 9", "age": 14, "vision_flag": 18.9, "hearing_flag": 1.7, "dental_flag": 23.4, "bmi_flag": 28.9},
    {"grade": "Grade 10", "age": 15, "vision_flag": 20.4, "hearing_flag": 1.6, "dental_flag": 22.1, "bmi_flag": 30.1},
    {"grade": "Grade 11", "age": 16, "vision_flag": 21.8, "hearing_flag": 1.5, "dental_flag": 20.8, "bmi_flag": 31.5},
    {"grade": "Grade 12", "age": 17, "vision_flag": 23.1, "hearing_flag": 1.4, "dental_flag": 19.5, "bmi_flag": 32.8}
]

# BMI Trend by Age Cohort
BMI_TRENDS_BY_AGE = [
    {"age": 6, "underweight": 8.5, "normal": 77.3, "overweight": 9.8, "obese": 4.4},
    {"age": 7, "underweight": 7.9, "normal": 76.3, "overweight": 10.6, "obese": 5.2},
    {"age": 8, "underweight": 7.2, "normal": 75.3, "overweight": 11.5, "obese": 6.0},
    {"age": 9, "underweight": 6.6, "normal": 74.3, "overweight": 12.4, "obese": 6.7},
    {"age": 10, "underweight": 6.0, "normal": 72.6, "overweight": 13.8, "obese": 7.6},
    {"age": 11, "underweight": 5.5, "normal": 70.7, "overweight": 15.1, "obese": 8.7},
    {"age": 12, "underweight": 5.1, "normal": 69.3, "overweight": 16.2, "obese": 9.4},
    {"age": 13, "underweight": 4.8, "normal": 68.0, "overweight": 17.0, "obese": 10.2},
    {"age": 14, "underweight": 4.5, "normal": 66.6, "overweight": 17.9, "obese": 11.0},
    {"age": 15, "underweight": 4.2, "normal": 65.7, "overweight": 18.5, "obese": 11.6},
    {"age": 16, "underweight": 4.0, "normal": 64.5, "overweight": 19.2, "obese": 12.3},
    {"age": 17, "underweight": 3.8, "normal": 63.4, "overweight": 19.9, "obese": 12.9}
]

# Detailed School Ranking Dataset (for TanStack Table)
SCHOOL_RANKINGS_DATA = [
    {
        "id": "SCH-101",
        "school_name": "Dubai International Academy",
        "region": "Dubai",
        "country": "UAE",
        "enrolled_students": 2450,
        "screening_completion": 98.4,
        "referral_rate": 14.2,
        "followup_completion": 91.5,
        "primary_flag_risk": "Vision",
        "status": "Exemplary"
    },
    {
        "id": "SCH-102",
        "school_name": "Al Yasmina Academy",
        "region": "Abu Dhabi",
        "country": "UAE",
        "enrolled_students": 1980,
        "screening_completion": 96.2,
        "referral_rate": 16.8,
        "followup_completion": 88.0,
        "primary_flag_risk": "BMI",
        "status": "Exemplary"
    },
    {
        "id": "SCH-103",
        "school_name": "Riyadh Educational Complex",
        "region": "Riyadh",
        "country": "Saudi Arabia",
        "enrolled_students": 3200,
        "screening_completion": 94.1,
        "referral_rate": 19.5,
        "followup_completion": 74.2,
        "primary_flag_risk": "Dental",
        "status": "Target Met"
    },
    {
        "id": "SCH-104",
        "school_name": "Sharjah Model School",
        "region": "Sharjah",
        "country": "UAE",
        "enrolled_students": 1450,
        "screening_completion": 91.0,
        "referral_rate": 18.0,
        "followup_completion": 69.5,
        "primary_flag_risk": "Dental",
        "status": "Target Met"
    },
    {
        "id": "SCH-105",
        "school_name": "Jeddah Knowledge International",
        "region": "Makkah & Jeddah",
        "country": "Saudi Arabia",
        "enrolled_students": 2100,
        "screening_completion": 89.5,
        "referral_rate": 21.4,
        "followup_completion": 62.0,
        "primary_flag_risk": "Vision",
        "status": "Follow-Up Gap"
    },
    {
        "id": "SCH-106",
        "school_name": "Dhahran Ahliyyah Schools",
        "region": "Eastern Province",
        "country": "Saudi Arabia",
        "enrolled_students": 2800,
        "screening_completion": 95.8,
        "referral_rate": 15.3,
        "followup_completion": 84.6,
        "primary_flag_risk": "Hearing",
        "status": "Exemplary"
    },
    {
        "id": "SCH-107",
        "school_name": "Emirates National School",
        "region": "Abu Dhabi",
        "country": "UAE",
        "enrolled_students": 3100,
        "screening_completion": 93.5,
        "referral_rate": 17.1,
        "followup_completion": 81.2,
        "primary_flag_risk": "BMI",
        "status": "Target Met"
    },
    {
        "id": "SCH-108",
        "school_name": "Al Khobar Secondary Academy",
        "region": "Eastern Province",
        "country": "Saudi Arabia",
        "enrolled_students": 1650,
        "screening_completion": 86.4,
        "referral_rate": 22.8,
        "followup_completion": 58.4,
        "primary_flag_risk": "Vision",
        "status": "Follow-Up Gap"
    },
    {
        "id": "SCH-109",
        "school_name": "GEMS World Academy",
        "region": "Dubai",
        "country": "UAE",
        "enrolled_students": 2300,
        "screening_completion": 97.1,
        "referral_rate": 13.9,
        "followup_completion": 94.0,
        "primary_flag_risk": "Vision",
        "status": "Exemplary"
    },
    {
        "id": "SCH-110",
        "school_name": "Al Falah Secondary School",
        "region": "Makkah & Jeddah",
        "country": "Saudi Arabia",
        "enrolled_students": 1890,
        "screening_completion": 81.2,
        "referral_rate": 24.5,
        "followup_completion": 51.0,
        "primary_flag_risk": "Dental",
        "status": "Action Required"
    }
]
