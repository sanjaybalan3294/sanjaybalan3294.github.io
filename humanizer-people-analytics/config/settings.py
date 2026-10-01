"""
Configuration and Environment Settings for Humanizer Enterprise Analytics
Adheres to EY enterprise data governance, Azure environments, and model hyperparameters.
"""

from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# Data Paths (Medallion Architecture)
DATA_DIR = BASE_DIR / "data"
RAW_DATA_PATH = DATA_DIR / "raw" / "workforce_raw_telemetry.csv"
SILVER_DATA_PATH = DATA_DIR / "processed" / "workforce_silver_cleansed.parquet"
GOLD_DIM_EMPLOYEE = DATA_DIR / "gold" / "dim_employee.parquet"
GOLD_FACT_ATTRITION = DATA_DIR / "gold" / "fact_attrition_risk.parquet"
GOLD_FACT_ENGAGEMENT = DATA_DIR / "gold" / "fact_engagement_pulse.parquet"

# Models Path
MODEL_DIR = BASE_DIR / "models"
MODEL_SAVE_PATH = MODEL_DIR / "attrition_classifier.pkl"
SCALER_SAVE_PATH = MODEL_DIR / "preprocessor_scaler.pkl"

# Azure & Enterprise Governance
AZURE_SYNAPSE_WORKSPACE = os.getenv("AZURE_SYNAPSE_WORKSPACE", "synw-ey-ci-analytics-prod")
AZURE_STORAGE_ACCOUNT = os.getenv("AZURE_STORAGE_ACCOUNT", "dlsceycipeoplegold")
DATA_LAKE_CONTAINER = os.getenv("DATA_LAKE_CONTAINER", "people-analytics-gold")
GDPR_SALT = os.getenv("GDPR_SALT", "ey_security_salt_2026_ci_digital")

# ML Hyperparameters
RANDOM_STATE = 42
TEST_SIZE = 0.20
HIGH_RISK_THRESHOLD = 0.65
MEDIUM_RISK_THRESHOLD = 0.40
