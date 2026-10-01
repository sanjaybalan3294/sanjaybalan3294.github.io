"""
Medallion Architecture ETL Pipeline (Bronze -> Silver -> Gold)
Azure Data Lake / Synapse Architecture Pattern
Applies GDPR privacy sanitization, feature derivation, and star-schema projection.
"""

import pandas as pd
import numpy as np
from pathlib import Path
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from config.settings import (
    RAW_DATA_PATH, SILVER_DATA_PATH, GOLD_DIM_EMPLOYEE, 
    GOLD_FACT_ATTRITION, GOLD_FACT_ENGAGEMENT, DATA_DIR
)

def run_bronze_to_silver() -> pd.DataFrame:
    print("\n--- [ETL Step 1: Bronze to Silver Cleansing & GDPR Sanitization] ---")
    if not RAW_DATA_PATH.exists():
        raise FileNotFoundError(f"Raw data not found at {RAW_DATA_PATH}. Run data_generator.py first.")
        
    df_raw = pd.read_csv(RAW_DATA_PATH)
    print(f"Ingested {len(df_raw)} records from Bronze layer.")

    # 1. GDPR PII Redaction
    # Drop identifiable raw employee IDs; retain cryptographically hashed ID
    df_silver = df_raw.drop(columns=["employee_id"]).copy()
    
    # 2. Type casting and date parsing
    df_silver["snapshot_date"] = pd.to_datetime(df_silver["snapshot_date"])
    
    # 3. Quality & Range clipping
    df_silver["compa_ratio"] = df_silver["compa_ratio"].clip(0.60, 1.50)
    df_silver["utilization_rate"] = df_silver["utilization_rate"].clip(40.0, 140.0)
    df_silver["monthly_overtime_hours"] = df_silver["monthly_overtime_hours"].clip(0.0, 80.0)
    
    # 4. Feature Engineering
    df_silver["tenure_years"] = np.round(df_silver["tenure_months"] / 12.0, 1)
    df_silver["is_high_performer"] = (df_silver["performance_rating"] >= 4).astype(int)
    
    # Compa-Ratio Bracket
    df_silver["compa_bracket"] = pd.cut(
        df_silver["compa_ratio"],
        bins=[0, 0.85, 0.95, 1.05, 2.0],
        labels=["<0.85 (Critical Underpay)", "0.85-0.95 (Below Median)", "0.95-1.05 (Target)", ">1.05 (Premium)"]
    )
    
    # Burnout Category
    df_silver["burnout_tier"] = pd.cut(
        df_silver["burnout_risk_index"],
        bins=[-1, 35, 60, 80, 101],
        labels=["Low", "Moderate", "Elevated", "Critical Exhaustion"]
    )
    
    # Save to Silver Parquet
    SILVER_DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    df_silver.to_parquet(SILVER_DATA_PATH, index=False)
    # Also save CSV for easy auditing
    df_silver.to_csv(DATA_DIR / "processed" / "workforce_silver_cleansed.csv", index=False)
    print(f"Silver layer complete: Saved {len(df_silver)} cleansed rows to {SILVER_DATA_PATH}")
    return df_silver

def run_silver_to_gold(df_silver: pd.DataFrame):
    print("\n--- [ETL Step 2: Silver to Gold Dimensional Star Schema Modeling] ---")
    
    # 1. Dimension: dim_employee
    dim_employee = df_silver[[
        "employee_hash", "rank_level", "tenure_months", "tenure_cohort", 
        "tenure_years", "is_high_performer"
    ]].drop_duplicates(subset=["employee_hash"]).copy()
    dim_employee["employee_key"] = range(1, len(dim_employee) + 1)
    
    # 2. Dimension: dim_department
    dim_department = df_silver[[
        "service_line", "practice_group", "office_city", "region"
    ]].drop_duplicates().copy().reset_index(drop=True)
    dim_department["department_key"] = range(1, len(dim_department) + 1)
    
    # Merge keys back into facts
    merged = df_silver.merge(
        dim_employee[["employee_hash", "employee_key"]], on="employee_hash"
    ).merge(
        dim_department[["service_line", "practice_group", "office_city", "department_key"]],
        on=["service_line", "practice_group", "office_city"]
    )
    
    # 3. Fact: fact_attrition_risk
    fact_attrition = merged[[
        "employee_key", "department_key", "snapshot_date", "base_salary", 
        "compa_ratio", "compa_bracket", "utilization_rate", "monthly_overtime_hours",
        "performance_rating", "promotion_last_24m", "manager_change_last_12m",
        "burnout_risk_index", "burnout_tier", "separation_type", "exit_reason",
        "is_regretted_attrition", "attrition_flag"
    ]].copy()
    
    # 4. Fact: fact_engagement_pulse
    fact_engagement = merged[[
        "employee_key", "department_key", "snapshot_date",
        "job_satisfaction_score", "manager_relationship_score",
        "work_life_balance_score", "growth_opportunity_score",
        "survey_verbatim", "sentiment_polarity"
    ]].copy()
    
    # Save Gold Marts
    (DATA_DIR / "gold").mkdir(parents=True, exist_ok=True)
    dim_employee.to_parquet(GOLD_DIM_EMPLOYEE, index=False)
    dim_employee.to_csv(DATA_DIR / "gold" / "dim_employee.csv", index=False)
    
    dim_department.to_parquet(DATA_DIR / "gold" / "dim_department.parquet", index=False)
    dim_department.to_csv(DATA_DIR / "gold" / "dim_department.csv", index=False)
    
    fact_attrition.to_parquet(GOLD_FACT_ATTRITION, index=False)
    fact_attrition.to_csv(DATA_DIR / "gold" / "fact_attrition_risk.csv", index=False)
    
    fact_engagement.to_parquet(GOLD_FACT_ENGAGEMENT, index=False)
    fact_engagement.to_csv(DATA_DIR / "gold" / "fact_engagement_pulse.csv", index=False)
    
    print("Gold dimensional marts successfully created:")
    print(f" - dim_employee: {len(dim_employee)} entities")
    print(f" - dim_department: {len(dim_department)} operational units")
    print(f" - fact_attrition_risk: {len(fact_attrition)} telemetry points")
    print(f" - fact_engagement_pulse: {len(fact_engagement)} survey responses")

def execute_medallion_pipeline():
    df_silver = run_bronze_to_silver()
    run_silver_to_gold(df_silver)
    print("\n[SUCCESS] Medallion ETL pipeline executed successfully.")

if __name__ == "__main__":
    execute_medallion_pipeline()
