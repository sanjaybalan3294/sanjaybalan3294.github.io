"""
Synthetic Workforce Telemetry Generator
Generates realistic, enterprise-grade HR, engagement, and attrition telemetry
reflecting global professional services (EY C&I / Consulting context).
"""

import numpy as np
import pandas as pd
import hashlib
import random
from datetime import datetime, timedelta
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from config.settings import RAW_DATA_PATH, DATA_DIR, GDPR_SALT, RANDOM_STATE

np.random.seed(RANDOM_STATE)
random.seed(RANDOM_STATE)

SERVICE_LINES = {
    "Consulting": ["Technology Consulting", "Business Consulting", "People Advisory Services"],
    "Strategy & Transactions": ["Strategy & Execution", "Transaction Diligence", "Corporate Finance"],
    "Tax": ["Direct Tax", "Indirect Tax & Transfer Pricing", "Global Compliance"],
    "Assurance": ["Audit Services", "Climate Change & Sustainability", "Forensic & Integrity"]
}

RANKS = ["Staff", "Senior Consultant", "Manager", "Senior Manager", "Assistant Director", "Director"]
RANK_SALARY_MIDPOINTS = {
    "Staff": 65000,
    "Senior Consultant": 95000,
    "Manager": 135000,
    "Senior Manager": 175000,
    "Assistant Director": 210000,
    "Director": 260000
}

LOCATIONS = [
    {"city": "Gurgaon", "region": "EMEIA/India"},
    {"city": "Bangalore", "region": "EMEIA/India"},
    {"city": "London", "region": "EMEIA/UK"},
    {"city": "New York", "region": "Americas/US"},
    {"city": "Chicago", "region": "Americas/US"},
    {"city": "Frankfurt", "region": "EMEIA/Germany"},
    {"city": "Singapore", "region": "APAC/Singapore"}
]

SURVEY_VERBATIMS_POSITIVE = [
    "Energized by our client cloud modernization engagement and collaborative team culture.",
    "Leadership provides tremendous career mentoring and clear promotion trajectory.",
    "Very fair compensation, excellent recognition from my engagement partner, and healthy work balance.",
    "Great autonomy on solution architecture. Enjoy mentoring junior analysts on agentic workflows.",
    "The transition to modern data stack and AI tooling has been a huge boost to our delivery velocity."
]

SURVEY_VERBATIMS_NEUTRAL = [
    "Standard project pacing. Client expectations are rigorous but manageable with proper staffing.",
    "Compensation aligns with industry averages. Waiting to see outcome of mid-year review cycle.",
    "Good team dynamic, though communication between onshore and offshore squads could be smoother.",
    "Training resources on Azure and Gen AI are decent, hoping for more hands-on lab allocations."
]

SURVEY_VERBATIMS_NEGATIVE = [
    "Severe burnout from sustained 60+ hour work weeks without staffing support on high-priority delivery.",
    "Compa-ratio is noticeably below market benchmark while billable utilization is consistently above 95%.",
    "Lack of psychological safety and micromanager style since recent leadership re-alignment.",
    "Frustrated by repeated delays in promotion cycle despite rating 5 performance in consecutive cycles.",
    "Disillusioned with unrealistic client deadlines and total absence of work-life boundaries."
]

def hash_id(identifier: str) -> str:
    """GDPR pseudonymous SHA-256 hash with cryptographic salt."""
    return hashlib.sha256(f"{identifier}_{GDPR_SALT}".encode()).hexdigest()

def generate_workforce_data(num_records: int = 6000) -> pd.DataFrame:
    print(f"Generating {num_records} enterprise workforce telemetry records...")
    
    records = []
    base_date = datetime(2026, 9, 1)

    for i in range(1, num_records + 1):
        emp_raw_id = f"EY-EMP-{10000 + i}"
        emp_hashed = hash_id(emp_raw_id)
        
        # Service Line & Practice
        service_line = random.choice(list(SERVICE_LINES.keys()))
        practice = random.choice(SERVICE_LINES[service_line])
        loc = random.choice(LOCATIONS)
        
        # Rank and Tenure
        rank = np.random.choice(RANKS, p=[0.30, 0.35, 0.18, 0.10, 0.05, 0.02])
        tenure_months = int(np.random.exponential(scale=32)) + 3
        if tenure_months > 180:
            tenure_months = 180
            
        tenure_cohort = (
            "0-1 Yr" if tenure_months <= 12 else
            "1-3 Yrs" if tenure_months <= 36 else
            "3-5 Yrs" if tenure_months <= 60 else "5+ Yrs"
        )
        
        # Compensation & Compa-Ratio (Normal dist around 0.96)
        midpoint = RANK_SALARY_MIDPOINTS[rank]
        compa_ratio = round(float(np.random.normal(loc=0.96, scale=0.08)), 3)
        compa_ratio = max(0.72, min(1.30, compa_ratio))
        base_salary = round(midpoint * compa_ratio, 2)
        
        # Operational Metrics
        utilization_rate = round(float(np.random.normal(loc=86.0, scale=8.5)), 1)
        utilization_rate = max(55.0, min(120.0, utilization_rate))
        
        overtime_hours = round(float(np.random.exponential(scale=14.0)), 1)
        if utilization_rate > 95:
            overtime_hours += float(np.random.uniform(15, 30))
        overtime_hours = min(65.0, overtime_hours)
        
        # Performance Rating (1 to 5 scale, EY Bell-curve)
        perf_rating = int(np.random.choice([1, 2, 3, 4, 5], p=[0.03, 0.12, 0.55, 0.22, 0.08]))
        promotion_last_24m = int(np.random.choice([0, 1], p=[0.78, 0.22]))
        manager_change_last_12m = int(np.random.choice([0, 1], p=[0.70, 0.30]))
        training_hours = int(np.random.uniform(10, 80))
        remote_work_pct = round(float(np.random.choice([20, 40, 60, 80, 100])), 0)
        
        # Pulse Survey Attributes (Correlated with Overtime and Compa-ratio)
        burnout_factor = (overtime_hours / 60.0) * 0.5 + (1.0 - min(compa_ratio, 1.1)) * 0.3
        
        wlb_score = max(1, min(5, int(np.round(4.2 - burnout_factor * 3.5 + np.random.normal(0, 0.5)))))
        sat_score = max(1, min(5, int(np.round(3.8 - burnout_factor * 2.5 + (0.5 if promotion_last_24m else -0.2) + np.random.normal(0, 0.5)))))
        mgr_score = max(1, min(5, int(np.round(4.0 - (0.8 if manager_change_last_12m else 0.0) + np.random.normal(0, 0.6)))))
        growth_score = max(1, min(5, int(np.round(3.7 + (0.8 if promotion_last_24m else -0.5) + np.random.normal(0, 0.5)))))
        
        # Burnout Index (0 - 100)
        burnout_index = round(min(100.0, max(5.0, (overtime_hours * 1.2) + (5 - wlb_score) * 8.0 + (1.0 - compa_ratio) * 20.0)), 1)
        
        # Verbatim Selection & Polarity
        if burnout_index > 65 or sat_score <= 2 or wlb_score <= 2:
            verbatim = random.choice(SURVEY_VERBATIMS_NEGATIVE)
            polarity = round(float(np.random.uniform(-0.85, -0.25)), 3)
        elif sat_score >= 4 and wlb_score >= 4:
            verbatim = random.choice(SURVEY_VERBATIMS_POSITIVE)
            polarity = round(float(np.random.uniform(0.35, 0.90)), 3)
        else:
            verbatim = random.choice(SURVEY_VERBATIMS_NEUTRAL)
            polarity = round(float(np.random.uniform(-0.15, 0.25)), 3)
            
        # Ground Truth Attrition Calculation (Calibrated for ~18% enterprise consulting baseline)
        log_odds = (
            -4.5
            + (1.0 - compa_ratio) * 4.0
            + (overtime_hours / 25.0) * 1.5
            + (1 if promotion_last_24m == 0 and tenure_months > 24 else 0) * 0.8
            + (5 - sat_score) * 0.5
            + (5 - wlb_score) * 0.4
            + (5 - mgr_score) * 0.3
            + (1 if tenure_cohort == "1-3 Yrs" else 0) * 0.4
            - (perf_rating - 3) * 0.2
        )
        prob_attrition = 1.0 / (1.0 + np.exp(-log_odds))
        attrition_flag = int(np.random.rand() < prob_attrition)
        
        # Exit metadata if attrition = 1
        exit_reason = "N/A"
        separation_type = "Active"
        is_regretted = 0
        if attrition_flag == 1:
            separation_type = "Voluntary Resignation"
            if compa_ratio < 0.90:
                exit_reason = "Competitive Compensation Offer"
            elif burnout_index > 65:
                exit_reason = "Work-Life Balance & Fatigue"
            elif growth_score <= 2:
                exit_reason = "Career Advancement & Role Velocity"
            else:
                exit_reason = "Personal / Relocation"
                
            if perf_rating >= 4 or rank in ["Manager", "Senior Manager", "Assistant Director"]:
                is_regretted = 1

        records.append({
            "employee_id": emp_raw_id,
            "employee_hash": emp_hashed,
            "snapshot_date": base_date.strftime("%Y-%m-%d"),
            "service_line": service_line,
            "practice_group": practice,
            "office_city": loc["city"],
            "region": loc["region"],
            "rank_level": rank,
            "tenure_months": tenure_months,
            "tenure_cohort": tenure_cohort,
            "base_salary": base_salary,
            "compa_ratio": compa_ratio,
            "utilization_rate": utilization_rate,
            "monthly_overtime_hours": overtime_hours,
            "performance_rating": perf_rating,
            "promotion_last_24m": promotion_last_24m,
            "manager_change_last_12m": manager_change_last_12m,
            "training_hours": training_hours,
            "remote_work_pct": remote_work_pct,
            "job_satisfaction_score": sat_score,
            "manager_relationship_score": mgr_score,
            "work_life_balance_score": wlb_score,
            "growth_opportunity_score": growth_score,
            "burnout_risk_index": burnout_index,
            "survey_verbatim": verbatim,
            "sentiment_polarity": polarity,
            "separation_type": separation_type,
            "exit_reason": exit_reason,
            "is_regretted_attrition": is_regretted,
            "attrition_flag": attrition_flag
        })

    df = pd.DataFrame(records)
    RAW_DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(RAW_DATA_PATH, index=False)
    print(f"Data generation complete: Saved {len(df)} rows to {RAW_DATA_PATH}")
    print(f"Overall Attrition Rate: {(df['attrition_flag'].mean()*100):.2f}%")
    print(f"Regretted Attritions: {df['is_regretted_attrition'].sum()}")
    return df

if __name__ == "__main__":
    generate_workforce_data(6000)
