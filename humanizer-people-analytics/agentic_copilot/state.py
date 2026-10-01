"""
Agentic Copilot State Models & Data Contracts
Built using Python standard dataclasses for high performance and zero dependency friction.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any

@dataclass
class EmployeeProfile:
    employee_hash: str
    service_line: str
    practice_group: str
    rank_level: str
    tenure_months: int
    compa_ratio: float
    monthly_overtime_hours: float
    performance_rating: int
    job_satisfaction_score: int
    work_life_balance_score: int
    manager_relationship_score: int
    growth_opportunity_score: int
    burnout_risk_index: float
    survey_verbatim: Optional[str] = None

@dataclass
class RiskDiagnosis:
    flight_risk_score: float # 0.0 to 1.0
    risk_tier: str # Low, Medium, High, Critical
    primary_root_causes: List[str]
    retention_urgency: str # Immediate (within 14 days), High (30 days), Monitor
    financial_exposure_usd: float

@dataclass
class HumanizedNarrative:
    executive_summary: str
    underlying_human_story: str
    manager_conversation_guide: List[str]
    recommended_retention_actions: List[Dict[str, str]]
    empathy_rating_score: float # 1.0 - 5.0 scale

@dataclass
class GovernanceAuditResult:
    gdpr_compliant: bool
    bias_check_passed: bool
    psychological_safety_flag: str
    audit_notes: str

@dataclass
class AgenticWorkflowState:
    query_intent: str
    target_filter: Dict[str, Any] = field(default_factory=dict)
    matched_employees: List[EmployeeProfile] = field(default_factory=list)
    diagnoses: List[RiskDiagnosis] = field(default_factory=list)
    humanized_output: Optional[HumanizedNarrative] = None
    governance_result: Optional[GovernanceAuditResult] = None
    execution_steps: List[str] = field(default_factory=list)
