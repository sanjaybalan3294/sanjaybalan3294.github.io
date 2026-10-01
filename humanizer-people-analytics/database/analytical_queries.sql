-- ============================================================================
-- Analytical SQL Queries - EY C&I People Analytics & Talent Intelligence
-- Executive Decision Support, Cohort Attrition, and Root-Cause Diagnostics
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Query 1: High-Performer Regretted Flight Risk Warning Mart
-- Identifies top-rated staff (Rating 4 or 5) with High Flight Risk (> 0.65)
-- along with compa-ratio deficit and burnout indicators.
-- ----------------------------------------------------------------------------
WITH LatestSnapshot AS (
    SELECT 
        s.employee_key,
        s.department_key,
        s.job_role_key,
        s.annual_base_salary,
        s.compa_ratio,
        s.monthly_overtime_hours,
        s.performance_rating,
        s.flight_risk_score,
        s.flight_risk_tier,
        s.burnout_risk_index,
        ROW_NUMBER() OVER(PARTITION BY s.employee_key ORDER BY s.date_key DESC) as rn
    FROM gold.fact_workforce_monthly_snapshot s
)
SELECT 
    d.service_line,
    d.practice_group,
    r.role_title,
    r.rank_level,
    e.tenure_cohort,
    COUNT(s.employee_key) AS high_performer_count,
    ROUND(AVG(s.flight_risk_score) * 100, 2) AS avg_flight_risk_pct,
    ROUND(AVG(s.compa_ratio), 3) AS avg_compa_ratio,
    ROUND(AVG(s.monthly_overtime_hours), 1) AS avg_monthly_ot_hours,
    ROUND(AVG(s.burnout_risk_index), 1) AS avg_burnout_index,
    ROUND(SUM(s.annual_base_salary * 1.5), 0) AS total_financial_replacement_exposure
FROM LatestSnapshot s
JOIN gold.dim_employee e ON s.employee_key = e.employee_key
JOIN gold.dim_department d ON s.department_key = d.department_key
JOIN gold.dim_job_role r ON s.job_role_key = r.job_role_key
WHERE s.rn = 1 
  AND s.performance_rating >= 4
  AND s.flight_risk_score >= 0.65
GROUP BY 
    d.service_line,
    d.practice_group,
    r.role_title,
    r.rank_level,
    e.tenure_cohort
HAVING COUNT(s.employee_key) >= 3
ORDER BY total_financial_replacement_exposure DESC;

-- ----------------------------------------------------------------------------
-- Query 2: Compensation Parity vs. Attrition Velocity by Quartile
-- Analyzes whether low compa-ratio drives voluntary departures across departments
-- ----------------------------------------------------------------------------
SELECT 
    d.service_line,
    CASE 
        WHEN s.compa_ratio < 0.85 THEN '1. Significantly Below Market (<0.85)'
        WHEN s.compa_ratio BETWEEN 0.85 AND 0.95 THEN '2. Moderately Below Market (0.85-0.95)'
        WHEN s.compa_ratio BETWEEN 0.95 AND 1.05 THEN '3. At Market Midpoint (0.95-1.05)'
        ELSE '4. Premium to Market (>1.05)'
    END AS compa_ratio_bracket,
    COUNT(DISTINCT s.employee_key) AS total_active_employees,
    COUNT(DISTINCT a.employee_key) AS voluntary_exits_ytd,
    ROUND(CAST(COUNT(DISTINCT a.employee_key) AS FLOAT) / NULLIF(COUNT(DISTINCT s.employee_key), 0) * 100, 2) AS annualized_attrition_rate_pct,
    ROUND(AVG(s.flight_risk_score) * 100, 2) AS predicted_model_risk_pct
FROM gold.fact_workforce_monthly_snapshot s
JOIN gold.dim_department d ON s.department_key = d.department_key
LEFT JOIN gold.fact_attrition_events a 
    ON s.employee_key = a.employee_key 
    AND a.separation_type = 'Voluntary Resignation'
GROUP BY 
    d.service_line,
    CASE 
        WHEN s.compa_ratio < 0.85 THEN '1. Significantly Below Market (<0.85)'
        WHEN s.compa_ratio BETWEEN 0.85 AND 0.95 THEN '2. Moderately Below Market (0.85-0.95)'
        WHEN s.compa_ratio BETWEEN 0.95 AND 1.05 THEN '3. At Market Midpoint (0.95-1.05)'
        ELSE '4. Premium to Market (>1.05)'
    END
ORDER BY d.service_line, compa_ratio_bracket;

-- ----------------------------------------------------------------------------
-- Query 3: Overtime Burnout & Pulse Sentiment Friction by Practice Group
-- Detects structural delivery strain where overtime exceeds threshold
-- and pulse sentiment drops into negative territory.
-- ----------------------------------------------------------------------------
SELECT 
    d.practice_group,
    COUNT(DISTINCT p.employee_key) AS surveyed_employees,
    ROUND(AVG(p.work_life_balance_score), 2) AS avg_work_life_balance,
    ROUND(AVG(p.manager_relationship_score), 2) AS avg_manager_score,
    ROUND(AVG(p.sentiment_polarity_score), 3) AS avg_nlp_sentiment_polarity,
    ROUND(AVG(w.monthly_overtime_hours), 1) AS avg_monthly_overtime_hours,
    CASE 
        WHEN AVG(w.monthly_overtime_hours) > 35 AND AVG(p.work_life_balance_score) < 2.8 THEN 'CRITICAL INTERVENTION'
        WHEN AVG(w.monthly_overtime_hours) > 20 OR AVG(p.work_life_balance_score) < 3.2 THEN 'WATCHLIST'
        ELSE 'STABLE'
    END AS operational_health_flag
FROM gold.fact_pulse_survey_responses p
JOIN gold.dim_department d ON p.department_key = d.department_key
JOIN gold.fact_workforce_monthly_snapshot w 
    ON p.employee_key = w.employee_key AND p.date_key = w.date_key
GROUP BY d.practice_group
ORDER BY avg_monthly_overtime_hours DESC;
