"""
Copilot Orchestrator & CLI Runner
Executes the full agent squad pipeline to humanize enterprise analytics.
"""

import sys
import os
import json

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from agentic_copilot.state import AgenticWorkflowState
from agentic_copilot.agents import (
    DataExtractionAgent, RiskDiagnosticAgent, 
    HumanizerStorytellerAgent, GovernanceEthicsAgent
)

class HumanizerCopilotOrchestrator:
    def __init__(self):
        self.extractor = DataExtractionAgent()
        self.diagnostician = RiskDiagnosticAgent()
        self.humanizer = HumanizerStorytellerAgent()
        self.auditor = GovernanceEthicsAgent()

    def run_investigation(self, query_intent: str, target_filter: dict = None) -> AgenticWorkflowState:
        if target_filter is None:
            target_filter = {"service_line": "Consulting", "min_risk_tier": "High"}
            
        state = AgenticWorkflowState(
            query_intent=query_intent,
            target_filter=target_filter
        )
        
        # Pipeline execution
        state = self.extractor.execute(state)
        state = self.diagnostician.execute(state)
        state = self.humanizer.execute(state)
        state = self.auditor.execute(state)
        
        return state

    def format_terminal_briefing(self, state: AgenticWorkflowState):
        print("\n" + "="*80)
        print("  EY HUMANIZER COPILOT: EXECUTIVE TALENT RETENTION INTELLIGENCE BRIEF")
        print("="*80)
        print(f"QUERY INTENT: {state.query_intent}")
        print(f"TARGET COHORT: {state.target_filter}")
        print(f"SAMPLED RECORDS ANALYZED: {len(state.matched_employees)}")
        print("-" * 80)
        
        print("\n [WORKFLOW EXECUTION TRACE]")
        for step in state.execution_steps:
            print(f"  -> {step}")
            
        if state.humanized_output:
            print("\n [EXECUTIVE BRIEFING]")
            print(state.humanized_output.executive_summary)
            
            print("\n [THE HUMAN STORY (BEHIND THE DATA)]")
            print(state.humanized_output.underlying_human_story)
            
            print("\n [1-ON-1 MANAGER CONVERSATION GUIDE]")
            for item in state.humanized_output.manager_conversation_guide:
                print(f"  * {item}")
                
            print("\n [STRATEGIC INTERVENTION PLAYBOOK]")
            for action in state.humanized_output.recommended_retention_actions:
                print(f"  * [{action['Pillar']}] {action['Action']}")
                print(f"    Expected Outcome: {action['Impact']}")
                
        if state.governance_result:
            print("\n [ETHICS & GOVERNANCE AUDIT]")
            print(f"  * GDPR Compliant: {state.governance_result.gdpr_compliant}")
            print(f"  * Safety Status: {state.governance_result.psychological_safety_flag}")
            print(f"  * Auditor Notes: {state.governance_result.audit_notes}")
            
        print("="*80 + "\n")

if __name__ == "__main__":
    orchestrator = HumanizerCopilotOrchestrator()
    sample_query = "Analyze retention risk among Senior Consultants in Technology Consulting"
    filter_spec = {"service_line": "Consulting", "rank_level": "Senior Consultant", "min_risk_tier": "High"}
    result_state = orchestrator.run_investigation(sample_query, filter_spec)
    orchestrator.format_terminal_briefing(result_state)
