"""
Unit and Integration Test Suite
Validates the end-to-end data pipeline, ML model inference, and multi-agent humanizer copilot
using Python standard library unittest (zero external testing dependencies).
"""

import unittest
import pandas as pd
import numpy as np
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from config.settings import (
    RAW_DATA_PATH, SILVER_DATA_PATH, GOLD_DIM_EMPLOYEE, 
    GOLD_FACT_ATTRITION, MODEL_SAVE_PATH
)
from models.attrition_risk_model import predict_employee_risk
from agentic_copilot.copilot_orchestrator import HumanizerCopilotOrchestrator

class TestHumanizerPipeline(unittest.TestCase):

    def test_raw_data_exists(self):
        """Verify Bronze layer generation produces valid records."""
        self.assertTrue(RAW_DATA_PATH.exists(), "Raw telemetry file should exist.")
        df = pd.read_csv(RAW_DATA_PATH)
        self.assertGreater(len(df), 1000, "Dataset should have at least 1,000 records.")
        self.assertIn("attrition_flag", df.columns)
        self.assertIn("compa_ratio", df.columns)

    def test_silver_layer_gdpr_sanitization(self):
        """Verify that Silver data strictly redacts plaintext employee IDs."""
        self.assertTrue(SILVER_DATA_PATH.exists(), "Silver parquet file should exist.")
        df = pd.read_parquet(SILVER_DATA_PATH)
        self.assertNotIn("employee_id", df.columns, "Plaintext employee_id must be redacted for GDPR.")
        self.assertIn("employee_hash", df.columns, "Pseudonymous hash must be present.")
        self.assertTrue((df["compa_ratio"] > 0).all())

    def test_gold_referential_integrity(self):
        """Verify foreign keys match between Fact and Dimension."""
        dim_emp = pd.read_parquet(GOLD_DIM_EMPLOYEE)
        fact_att = pd.read_parquet(GOLD_FACT_ATTRITION)
        
        self.assertIn("employee_key", dim_emp.columns)
        self.assertIn("employee_key", fact_att.columns)
        orphans = set(fact_att["employee_key"]) - set(dim_emp["employee_key"])
        self.assertEqual(len(orphans), 0, "No orphan employee keys allowed in Gold fact table.")

    def test_ml_model_prediction(self):
        """Verify inference pipeline produces bounded risk probabilities and root causes."""
        self.assertTrue(MODEL_SAVE_PATH.exists(), "Trained model pickle should exist.")
        test_sample = {
            "tenure_months": 28,
            "compa_ratio": 0.82,
            "monthly_overtime_hours": 38.5,
            "utilization_rate": 96.0,
            "performance_rating": 4,
            "training_hours": 30,
            "burnout_risk_index": 72.0,
            "job_satisfaction_score": 2,
            "manager_relationship_score": 2,
            "work_life_balance_score": 1,
            "growth_opportunity_score": 2,
            "sentiment_polarity": -0.65,
            "service_line": "Consulting",
            "rank_level": "Senior Consultant",
            "promotion_last_24m": 0,
            "manager_change_last_12m": 1
        }
        result = predict_employee_risk(test_sample)
        self.assertGreaterEqual(result["flight_risk_probability"], 0.0)
        self.assertLessEqual(result["flight_risk_probability"], 1.0)
        self.assertIn(result["risk_tier"], ["Low", "Medium", "High", "Critical"])
        self.assertGreater(len(result["primary_drivers"]), 0)

    def test_agentic_copilot_humanizer(self):
        """Verify multi-agent orchestrator crafts humanized narratives with high empathy."""
        orchestrator = HumanizerCopilotOrchestrator()
        state = orchestrator.run_investigation(
            query_intent="Assess burnout risk in Tech Consulting",
            target_filter={"service_line": "Consulting", "min_risk_tier": "High"}
        )
        self.assertGreater(len(state.matched_employees), 0)
        self.assertIsNotNone(state.humanized_output)
        self.assertGreaterEqual(state.humanized_output.empathy_rating_score, 4.0)
        self.assertGreaterEqual(len(state.humanized_output.manager_conversation_guide), 3)
        self.assertTrue(state.governance_result.gdpr_compliant)

if __name__ == "__main__":
    unittest.main()
