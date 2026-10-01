# Power BI Dimensional Model Architecture & Semantic Layer Specification

## 1. Overview
This tabular data model implements a strict **Kimball Star Schema** within Microsoft Power BI / Fabric / Azure Synapse Serverless SQL. It is designed to empower senior executive leadership (Partners, Practice Leaders, People Advisory Directors) to move from raw operational telemetry to human-centered talent interventions.

---

## 2. Entity Relationship Diagram (Star Schema)

```mermaid
erDiagram
    dim_employee ||--o{ fact_attrition_risk : "1-to-Many (employee_key)"
    dim_employee ||--o{ fact_engagement_pulse : "1-to-Many (employee_key)"
    dim_department ||--o{ fact_attrition_risk : "1-to-Many (department_key)"
    dim_department ||--o{ fact_engagement_pulse : "1-to-Many (department_key)"
    dim_date ||--o{ fact_attrition_risk : "1-to-Many (date_key)"
    dim_date ||--o{ fact_engagement_pulse : "1-to-Many (date_key)"

    dim_employee {
        int employee_key PK
        string employee_hash
        string rank_level
        int tenure_months
        string tenure_cohort
        decimal tenure_years
        int is_high_performer
    }

    dim_department {
        int department_key PK
        string service_line
        string practice_group
        string office_city
        string region
    }

    fact_attrition_risk {
        int employee_key FK
        int department_key FK
        date snapshot_date
        decimal base_salary
        decimal compa_ratio
        decimal monthly_overtime_hours
        int performance_rating
        decimal burnout_risk_index
        int attrition_flag
        int is_regretted_attrition
    }

    fact_engagement_pulse {
        int employee_key FK
        int department_key FK
        date snapshot_date
        int job_satisfaction_score
        int manager_relationship_score
        int work_life_balance_score
        int growth_opportunity_score
        decimal sentiment_polarity
    }
```

---

## 3. Best Practices & Optimization Implemented
1. **Single-Direction Cross-Filtering (`1 -> *`)**:
   - Bi-directional filtering is strictly disabled to avoid circular relationship ambiguities and maximize VertiPaq engine compression.
2. **Surrogate Keys**:
   - All relationships link via clean integer keys (`employee_key`, `department_key`, `date_key`).
3. **GDPR Pseudonymization at Source**:
   - Direct employee identifiers (email, name) are stripped during the Silver ETL stage. Only SHA-256 salted hashes exist in the reporting model.
4. **Calculated Measures Over Calculated Columns**:
   - Dynamic ratios and financial exposures are defined purely in DAX measures to conserve memory and enable dynamic filter context evaluation.
