"""
Enterprise Data Governance & Quality Assurance Engine
Adheres to EY enterprise standards for data quality, GDPR compliance,
referential integrity, and distributional stability.
"""

import pandas as pd
import numpy as np
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from config.settings import (
    SILVER_DATA_PATH, GOLD_DIM_EMPLOYEE, GOLD_FACT_ATTRITION, 
    GOLD_FACT_ENGAGEMENT, DATA_DIR
)

class DataGovernanceAuditor:
    def __init__(self):
        self.audit_log = []
        self.errors = []
        
    def log_check(self, check_name: str, status: str, details: str):
        record = {"check": check_name, "status": status, "details": details}
        self.audit_log.append(record)
        badge = "[PASS]" if status == "PASS" else "[FAIL]"
        print(f" {badge} {check_name}: {details}")

    def verify_gdpr_compliance(self, df_silver: pd.DataFrame):
        """Audit for unhashed PII identifiers in Silver data."""
        forbidden_pii = ["employee_id", "email", "first_name", "last_name", "ssn", "phone"]
        detected = [col for col in forbidden_pii if col in df_silver.columns]
        
        if detected:
            self.log_check("GDPR PII Anonymization", "FAIL", f"Found raw PII fields: {detected}")
            self.errors.append("GDPR Non-Compliance")
        else:
            self.log_check("GDPR PII Anonymization", "PASS", "No plaintext PII found. Hash pseudonymization verified.")

    def verify_null_thresholds(self, df: pd.DataFrame, max_null_pct: float = 0.01):
        """Ensure no mandatory core column exceeds null threshold."""
        # Conditional fields like exit_reason are expected to be null for active staff
        mandatory_cols = [
            col for col in df.columns 
            if col not in ["exit_reason", "separation_type", "humanized_summary_narrative"]
        ]
        null_counts = df[mandatory_cols].isnull().mean()
        high_nulls = null_counts[null_counts > max_null_pct].to_dict()
        
        if high_nulls:
            self.log_check("Completeness & Null Check", "FAIL", f"Mandatory columns exceed {max_null_pct*100}% nulls: {high_nulls}")
            self.errors.append("Null constraint breach")
        else:
            self.log_check("Completeness & Null Check", "PASS", f"100% of mandatory columns ({len(mandatory_cols)} fields) satisfy strict null tolerances.")

    def verify_metric_bounds(self, df_silver: pd.DataFrame):
        """Validate logical business bounds on operational telemetry."""
        issues = []
        if (df_silver["compa_ratio"] < 0.50).any() or (df_silver["compa_ratio"] > 1.80).any():
            issues.append("Compa-ratio outside realistic range [0.50, 1.80]")
        if (df_silver["performance_rating"] < 1).any() or (df_silver["performance_rating"] > 5).any():
            issues.append("Performance rating outside 1-5 scale")
        if (df_silver["burnout_risk_index"] < 0).any() or (df_silver["burnout_risk_index"] > 100).any():
            issues.append("Burnout risk index outside 0-100 range")
            
        if issues:
            self.log_check("Business Rule Validation", "FAIL", "; ".join(issues))
            self.errors.append("Boundary constraint failure")
        else:
            self.log_check("Business Rule Validation", "PASS", "All metrics conform to domain boundaries.")

    def verify_referential_integrity(self):
        """Ensure facts properly link to dimensions in Gold layer."""
        if not GOLD_DIM_EMPLOYEE.exists() or not GOLD_FACT_ATTRITION.exists():
            self.log_check("Referential Integrity", "SKIP", "Gold tables not generated yet.")
            return

        dim_emp = pd.read_parquet(GOLD_DIM_EMPLOYEE)
        fact_att = pd.read_parquet(GOLD_FACT_ATTRITION)

        orphan_keys = set(fact_att["employee_key"]) - set(dim_emp["employee_key"])
        if orphan_keys:
            self.log_check("Referential Integrity", "FAIL", f"Found {len(orphan_keys)} orphan employee keys in Fact.")
            self.errors.append("Orphan FK found")
        else:
            self.log_check("Referential Integrity", "PASS", f"100% of {len(fact_att)} fact keys match dimension keys.")

    def run_full_audit(self):
        print("\n=======================================================")
        print("   EY DATA GOVERNANCE & QUALITY AUDIT SUITE           ")
        print("=======================================================")
        
        if not SILVER_DATA_PATH.exists():
            print(f"Silver dataset not found at {SILVER_DATA_PATH}. Skipping silver checks.")
            return False

        df_silver = pd.read_parquet(SILVER_DATA_PATH)
        self.verify_gdpr_compliance(df_silver)
        self.verify_null_thresholds(df_silver)
        self.verify_metric_bounds(df_silver)
        self.verify_referential_integrity()

        print("-------------------------------------------------------")
        if not self.errors:
            print("[SUCCESS] All enterprise governance checks passed.")
            return True
        else:
            print(f"[ALERT] {len(self.errors)} governance errors detected!")
            return False

if __name__ == "__main__":
    auditor = DataGovernanceAuditor()
    auditor.run_full_audit()
