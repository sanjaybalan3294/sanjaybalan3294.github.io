-- ============================================================================
-- Gold Semantic Views for Power BI & Executive Dashboards
-- Platform: Azure Synapse / SQL Server
-- ============================================================================

CREATE OR ALTER VIEW gold.vw_executive_talent_kpis AS
WITH CurrentSnapshot AS (
    SELECT 
        s.snapshot_key,
        s.date_key,
        s.employee_key,
        s.department_key,
        s.job_role_key,
        s.annual_base_salary,
        s.compa_ratio,
        s.monthly_overtime_hours,
        s.performance_rating,
        s.promotion_last_24_months,
        s.flight_risk_score,
        s.flight_risk_tier,
        s.burnout_risk_index,
        ROW_NUMBER() OVER(PARTITION BY s.employee_key ORDER BY s.date_key DESC) as row_num
    FROM gold.fact_workforce_monthly_snapshot s
)
SELECT 
    s.employee_key,
    e.employee_id_hashed,
    e.gender,
    e.tenure_cohort,
    d.service_line,
    d.practice_group,
    d.geography_region,
    d.office_location,
    r.role_title,
    r.rank_level,
    r.job_family,
    s.annual_base_salary,
    s.compa_ratio,
    s.monthly_overtime_hours,
    s.performance_rating,
    s.promotion_last_24_months,
    s.flight_risk_score,
    s.flight_risk_tier,
    s.burnout_risk_index,
    CASE 
        WHEN s.flight_risk_score >= 0.65 THEN 1 
        ELSE 0 
    END AS is_high_flight_risk,
    CASE 
        WHEN s.flight_risk_score >= 0.65 AND s.performance_rating >= 4 THEN 1 
        ELSE 0 
    END AS is_regretted_risk_target,
    s.annual_base_salary * 1.5 AS potential_replacement_cost
FROM CurrentSnapshot s
JOIN gold.dim_employee e ON s.employee_key = e.employee_key
JOIN gold.dim_department d ON s.department_key = d.department_key
JOIN gold.dim_job_role r ON s.job_role_key = r.job_role_key
WHERE s.row_num = 1;
GO

CREATE OR ALTER VIEW gold.vw_department_attrition_summary AS
SELECT 
    d.service_line,
    d.practice_group,
    d.office_location,
    COUNT(DISTINCT s.employee_key) AS active_headcount,
    ROUND(AVG(s.flight_risk_score) * 100, 1) AS avg_flight_risk_pct,
    SUM(CASE WHEN s.flight_risk_score >= 0.65 THEN 1 ELSE 0 END) AS high_risk_headcount,
    ROUND(AVG(s.compa_ratio), 3) AS avg_compa_ratio,
    ROUND(AVG(s.monthly_overtime_hours), 1) AS avg_monthly_overtime_hours,
    ROUND(AVG(s.burnout_risk_index), 1) AS avg_burnout_index
FROM gold.fact_workforce_monthly_snapshot s
JOIN gold.dim_department d ON s.department_key = d.department_key
GROUP BY d.service_line, d.practice_group, d.office_location;
GO
