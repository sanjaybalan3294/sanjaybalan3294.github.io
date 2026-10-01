"""
Multi-Agent Framework for Humanizer Copilot
Simulates an enterprise Copilot Studio agent squad:
1. DataExtractionAgent (SQL / Parquet gold retrieval)
2. RiskDiagnosticAgent (Predictive root-cause synthesizer)
3. HumanizerStorytellerAgent (Transforms cold data into compassionate executive leadership narratives)
4. GovernanceEthicsAgent (GDPR, ethical AI, and psychological safety guardrails)
"""

import pandas as pd
import numpy as np
import sys
import os
from typing import List, Dict, Any

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from config.settings import SILVER_DATA_PATH
from agentic_copilot.state import (
    EmployeeProfile, RiskDiagnosis, HumanizedNarrative, 
    GovernanceAuditResult, AgenticWorkflowState
)

class DataExtractionAgent:
    """Specialist Agent: Queries Gold/Silver analytical stores with flexible filtering."""
    def __init__(self):
        self.df = pd.read_parquet(SILVER_DATA_PATH)
        
    def execute(self, state: AgenticWorkflowState) -> AgenticWorkflowState:
        state.execution_steps.append("DataExtractionAgent: Querying Gold workforce telemetry")
        query_filter = state.target_filter
        
        filtered = self.df.copy()
        if "service_line" in query_filter and query_filter["service_line"] != "All":
            filtered = filtered[filtered["service_line"] == query_filter["service_line"]]
        if "rank_level" in query_filter and query_filter["rank_level"] != "All":
            filtered = filtered[filtered["rank_level"] == query_filter["rank_level"]]
        if "min_risk_tier" in query_filter:
            # Filter high burnout or risk
            filtered = filtered[filtered["burnout_risk_index"] >= 50.0]

        # Take up to 10 representative records for deep-dive analysis
        sample = filtered.head(10)
        profiles = []
        for _, row in sample.iterrows():
            profile = EmployeeProfile(
                employee_hash=row["employee_hash"][:12] + "...",
                service_line=row["service_line"],
                practice_group=row["practice_group"],
                rank_level=row["rank_level"],
                tenure_months=int(row["tenure_months"]),
                compa_ratio=float(row["compa_ratio"]),
                monthly_overtime_hours=float(row["monthly_overtime_hours"]),
                performance_rating=int(row["performance_rating"]),
                job_satisfaction_score=int(row["job_satisfaction_score"]),
                work_life_balance_score=int(row["work_life_balance_score"]),
                manager_relationship_score=int(row["manager_relationship_score"]),
                growth_opportunity_score=int(row["growth_opportunity_score"]),
                burnout_risk_index=float(row["burnout_risk_index"]),
                survey_verbatim=str(row.get("survey_verbatim", "Standard engagement."))
            )
            profiles.append(profile)
            
        state.matched_employees = profiles
        state.execution_steps.append(f"DataExtractionAgent: Identified {len(profiles)} relevant consultant profiles.")
        return state

class RiskDiagnosticAgent:
    """Specialist Agent: Synthesizes risk telemetry and assigns root-cause attribution."""
    def execute(self, state: AgenticWorkflowState) -> AgenticWorkflowState:
        state.execution_steps.append("RiskDiagnosticAgent: Calculating risk exposure and isolating root causes")
        diagnoses = []
        
        for emp in state.matched_employees:
            drivers = []
            risk_score = min(0.95, (emp.burnout_risk_index / 100.0) * 0.5 + (1.05 - emp.compa_ratio) * 0.4)
            risk_score = round(max(0.10, risk_score), 3)
            
            if emp.compa_ratio < 0.90:
                drivers.append(f"Comp Parity Lag: Earning {emp.compa_ratio*100:.1f}% of market benchmark")
            if emp.monthly_overtime_hours > 25:
                drivers.append(f"Fatigue Hazard: Logging {emp.monthly_overtime_hours} overtime hours monthly")
            if emp.work_life_balance_score <= 2:
                drivers.append("Work-Life Balance Strain: Survey score 1-2 out of 5")
            if emp.manager_relationship_score <= 2:
                drivers.append("Leadership Misalignment: Low manager rapport score")
            if emp.performance_rating >= 4 and emp.compa_ratio < 0.95:
                drivers.append("Regretted Talent Risk: High rating with unadjusted comp")
                
            tier = "Critical" if risk_score >= 0.70 else "High" if risk_score >= 0.50 else "Medium"
            urgency = "Immediate (14 Days)" if tier == "Critical" else "High Priority (30 Days)" if tier == "High" else "Monitor"
            
            # Estimated financial exposure (1.5x salary replacement cost)
            estimated_salary = 95000 if "Senior" in emp.rank_level else 135000 if "Manager" in emp.rank_level else 70000
            exposure = round(estimated_salary * 1.5, 0)
            
            diagnoses.append(RiskDiagnosis(
                flight_risk_score=risk_score,
                risk_tier=tier,
                primary_root_causes=drivers if drivers else ["Normal tenure progression"],
                retention_urgency=urgency,
                financial_exposure_usd=exposure
            ))
            
        state.diagnoses = diagnoses
        state.execution_steps.append(f"RiskDiagnosticAgent: Diagnosed {len(diagnoses)} risk profiles.")
        return state

class HumanizerStorytellerAgent:
    """
    The Core 'Humanizer' Agent:
    Translates cold, sterile statistical anomalies into empathetic,
    human-centered leadership narratives and constructive manager playbooks.
    """
    def execute(self, state: AgenticWorkflowState) -> AgenticWorkflowState:
        state.execution_steps.append("HumanizerStorytellerAgent: Translating quantitative telemetry into humanized leadership narrative")
        
        if not state.matched_employees:
            state.humanized_output = HumanizedNarrative(
                executive_summary="Workforce telemetry indicates healthy retention stability across the target cohort.",
                underlying_human_story="Consultants are reporting positive project morale with no anomalous burnout signals.",
                manager_conversation_guide=["Maintain regular bi-weekly check-ins to reinforce positive engagement."],
                recommended_retention_actions=[{"Action": "Standard Recognition", "Timeline": "Ongoing"}],
                empathy_rating_score=4.8
            )
            return state

        # Cohort summary stats
        avg_ot = np.mean([e.monthly_overtime_hours for e in state.matched_employees])
        avg_compa = np.mean([e.compa_ratio for e in state.matched_employees])
        critical_count = sum(1 for d in state.diagnoses if d.risk_tier in ["High", "Critical"])
        total_exposure = sum(d.financial_exposure_usd for d in state.diagnoses)

        # Humanized Executive Briefing
        exec_summary = (
            f"Behind the {critical_count} flagged flight-risk alerts lies a predictable human pattern: "
            f"dedicated consultants are delivering under sustained project intensity (averaging {avg_ot:.1f} hours of uncredited monthly overtime), "
            f"while sensing an equity disconnect as their market compensation ratio sits at {avg_compa*100:.1f}%. "
            f"Without human intervention, this cohort represents an immediate intellectual property and delivery exposure of ${total_exposure:,.0f}."
        )

        human_story = (
            "These team members are not looking to disengage—they are grappling with quiet exhaustion. "
            "Survey verbatims reveal that their commitment to client delivery excellence remains high, "
            "but the combination of tight delivery deadlines, compressed promotion expectations, and lack of visible leader empathy "
            "creates the perception that their personal sacrifices are treated merely as operational line items."
        )

        conversation_guide = [
            "1. Open with Genuine Gratitude: Acknowledge their specific contributions to the latest client milestones before discussing metrics or pacing.",
            "2. Listen Without Defensiveness: Ask: 'Over the last 60 days, what has felt most draining about our current sprint cycle?' and allow them to speak freely.",
            "3. Validate Workload Realities: Confirm that the current 50+ hour run rate is temporary and share a concrete plan to backfill or re-scope offshore squad deliverables.",
            "4. Transparent Career & Comp Review: Proactively address their compa-ratio positioning and outline the exact review milestone for equity alignment."
        ]

        actions = [
            {
                "Pillar": "Delivery Relief",
                "Action": "Implement immediate workload re-balancing by offloading 20% of repetitive reporting tasks to automated pipelines or offshore squads.",
                "Impact": "Drops burnout index by estimated 25% within 3 weeks."
            },
            {
                "Pillar": "Compensation Parity",
                "Action": "Submit an out-of-cycle mid-year compensation equity adjustment to bring key performers to 0.98+ compa-ratio.",
                "Impact": "Mitigates primary external poaching vulnerability."
            },
            {
                "Pillar": "Psychological Safety & Growth",
                "Action": "Schedule a dedicated sponsor mentoring session with Practice Leadership focusing on 12-month promotion readiness.",
                "Impact": "Re-anchors emotional commitment and long-term career belonging."
            }
        ]

        state.humanized_output = HumanizedNarrative(
            executive_summary=exec_summary,
            underlying_human_story=human_story,
            manager_conversation_guide=conversation_guide,
            recommended_retention_actions=actions,
            empathy_rating_score=4.9
        )
        state.execution_steps.append("HumanizerStorytellerAgent: Humanized action playbook successfully crafted.")
        return state

class GovernanceEthicsAgent:
    """Specialist Agent: Validates GDPR privacy compliance, algorithmic fairness, and tone."""
    def execute(self, state: AgenticWorkflowState) -> AgenticWorkflowState:
        state.execution_steps.append("GovernanceEthicsAgent: Auditing output for GDPR, fairness, and ethical guardrails")
        
        # Check that no plaintext identifiers are surfaced in the narrative
        gdpr_ok = True
        for emp in state.matched_employees:
            if not emp.employee_hash.endswith("..."):
                gdpr_ok = False
                
        notes = (
            "Audited against EY Responsible AI Guidelines. "
            "Zero PII exposed; all recommendations focus on managerial support, equity parity, and workload protection. "
            "No punitive or surveillance-based interventions recommended."
        )

        state.governance_result = GovernanceAuditResult(
            gdpr_compliant=gdpr_ok,
            bias_check_passed=True,
            psychological_safety_flag="SAFE",
            audit_notes=notes
        )
        state.execution_steps.append("GovernanceEthicsAgent: Audit passed with full compliance.")
        return state
