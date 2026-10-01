-- ============================================================================
-- Enterprise Star Schema DDL - EY People Analytics & Digital Engagement
-- Target Platform: Azure Synapse Analytics / SQL Server Dedicated Pool
-- Standard: Kimball Dimensional Modeling with GDPR Privacy Governance
-- ============================================================================

CREATE SCHEMA gold;
GO

-- ----------------------------------------------------------------------------
-- 1. DIMENSION: dim_date
-- ----------------------------------------------------------------------------
CREATE TABLE gold.dim_date (
    date_key INT NOT NULL,                  -- YYYYMMDD
    full_date DATE NOT NULL,
    year_num INT NOT NULL,
    quarter_num TINYINT NOT NULL,
    quarter_name VARCHAR(10) NOT NULL,      -- 'Q1-2026'
    month_num TINYINT NOT NULL,
    month_name VARCHAR(20) NOT NULL,        -- 'September'
    month_year VARCHAR(10) NOT NULL,        -- 'Sep-2026'
    fiscal_year INT NOT NULL,
    fiscal_quarter VARCHAR(10) NOT NULL,
    is_weekend BIT NOT NULL DEFAULT 0,
    CONSTRAINT pk_dim_date PRIMARY KEY CLUSTERED (date_key)
);

-- ----------------------------------------------------------------------------
-- 2. DIMENSION: dim_department
-- ----------------------------------------------------------------------------
CREATE TABLE gold.dim_department (
    department_key INT IDENTITY(1,1) NOT NULL,
    department_code VARCHAR(20) NOT NULL,
    service_line VARCHAR(100) NOT NULL,     -- Consulting, Strategy & Transactions, Tax, Assurance
    practice_group VARCHAR(100) NOT NULL,   -- Technology Consulting, People Advisory, Business Consulting
    cost_center VARCHAR(50) NOT NULL,
    geography_region VARCHAR(50) NOT NULL,  -- EMEIA, Americas, APAC
    office_location VARCHAR(100) NOT NULL,  -- Gurgaon, Bangalore, London, New York
    is_active BIT NOT NULL DEFAULT 1,
    CONSTRAINT pk_dim_department PRIMARY KEY CLUSTERED (department_key)
);

-- ----------------------------------------------------------------------------
-- 3. DIMENSION: dim_job_role
-- ----------------------------------------------------------------------------
CREATE TABLE gold.dim_job_role (
    job_role_key INT IDENTITY(1,1) NOT NULL,
    role_code VARCHAR(30) NOT NULL,
    role_title VARCHAR(150) NOT NULL,
    rank_level VARCHAR(50) NOT NULL,        -- Staff, Senior Consultant, Manager, Senior Manager, Assistant Director, Director, Partner
    job_family VARCHAR(100) NOT NULL,       -- Data & Analytics, Cloud Engineering, Management Consulting
    standard_annual_hours INT NOT NULL DEFAULT 2080,
    target_billable_utilization DECIMAL(5,2) NOT NULL DEFAULT 85.00,
    CONSTRAINT pk_dim_job_role PRIMARY KEY CLUSTERED (job_role_key)
);

-- ----------------------------------------------------------------------------
-- 4. DIMENSION: dim_employee (SCD Type 2 with GDPR Pseudonymization)
-- ----------------------------------------------------------------------------
CREATE TABLE gold.dim_employee (
    employee_key INT IDENTITY(1,1) NOT NULL,
    employee_id_hashed CHAR(64) NOT NULL,   -- SHA-256 pseudonymized ID (GDPR compliant)
    gender VARCHAR(20) NOT NULL,
    education_level VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    tenure_cohort VARCHAR(30) NOT NULL,     -- '0-1 Yr', '1-3 Yrs', '3-5 Yrs', '5+ Yrs'
    prior_experience_months INT NOT NULL,
    manager_id_hashed CHAR(64) NULL,
    is_current BIT NOT NULL DEFAULT 1,
    effective_start_date DATE NOT NULL,
    effective_end_date DATE NOT NULL DEFAULT '9999-12-31',
    CONSTRAINT pk_dim_employee PRIMARY KEY CLUSTERED (employee_key)
);

CREATE INDEX idx_dim_employee_hash ON gold.dim_employee(employee_id_hashed);

-- ----------------------------------------------------------------------------
-- 5. FACT: fact_workforce_monthly_snapshot
-- ----------------------------------------------------------------------------
CREATE TABLE gold.fact_workforce_monthly_snapshot (
    snapshot_key BIGINT IDENTITY(1,1) NOT NULL,
    date_key INT NOT NULL,
    employee_key INT NOT NULL,
    department_key INT NOT NULL,
    job_role_key INT NOT NULL,
    
    -- Compensation & Benchmarks
    annual_base_salary DECIMAL(18,2) NOT NULL,
    compa_ratio DECIMAL(5,3) NOT NULL,      -- Salary / Midpoint of salary grade band (e.g., 0.92 = 92% of median)
    bonus_incentive_paid DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    
    -- Engagement & Utilization
    monthly_billable_hours DECIMAL(6,1) NOT NULL,
    monthly_overtime_hours DECIMAL(6,1) NOT NULL,
    utilization_rate DECIMAL(5,2) NOT NULL,
    
    -- Performance & Sentiments
    performance_rating TINYINT NOT NULL,    -- 1 (Unsatisfactory) to 5 (Exceptional)
    promotion_last_24_months BIT NOT NULL DEFAULT 0,
    flight_risk_score DECIMAL(5,4) NOT NULL,-- ML predicted score (0.0000 - 1.0000)
    flight_risk_tier VARCHAR(20) NOT NULL,  -- Low, Medium, High, Critical
    burnout_risk_index DECIMAL(5,2) NOT NULL,-- Derived telemetry (0.0 - 100.0)
    
    -- Metadata
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    
    CONSTRAINT pk_fact_workforce_snapshot PRIMARY KEY CLUSTERED (snapshot_key),
    CONSTRAINT fk_workforce_date FOREIGN KEY (date_key) REFERENCES gold.dim_date(date_key),
    CONSTRAINT fk_workforce_emp FOREIGN KEY (employee_key) REFERENCES gold.dim_employee(employee_key),
    CONSTRAINT fk_workforce_dept FOREIGN KEY (department_key) REFERENCES gold.dim_department(department_key),
    CONSTRAINT fk_workforce_role FOREIGN KEY (job_role_key) REFERENCES gold.dim_job_role(job_role_key)
);

-- ----------------------------------------------------------------------------
-- 6. FACT: fact_attrition_events
-- ----------------------------------------------------------------------------
CREATE TABLE gold.fact_attrition_events (
    attrition_key INT IDENTITY(1,1) NOT NULL,
    separation_date_key INT NOT NULL,
    employee_key INT NOT NULL,
    department_key INT NOT NULL,
    job_role_key INT NOT NULL,
    
    separation_type VARCHAR(50) NOT NULL,   -- Voluntary Resignation, Involuntary, Retirement
    primary_exit_reason VARCHAR(150) NOT NULL, -- Compensation, Work-Life Balance, Career Growth, Manager Friction
    is_regretted_attrition BIT NOT NULL,    -- 1 if high-performer or critical skill
    tenure_months_at_exit INT NOT NULL,
    estimated_replacement_cost DECIMAL(18,2) NOT NULL,
    
    CONSTRAINT pk_fact_attrition PRIMARY KEY CLUSTERED (attrition_key),
    CONSTRAINT fk_attrition_date FOREIGN KEY (separation_date_key) REFERENCES gold.dim_date(date_key),
    CONSTRAINT fk_attrition_emp FOREIGN KEY (employee_key) REFERENCES gold.dim_employee(employee_key),
    CONSTRAINT fk_attrition_dept FOREIGN KEY (department_key) REFERENCES gold.dim_department(department_key),
    CONSTRAINT fk_attrition_role FOREIGN KEY (job_role_key) REFERENCES gold.dim_job_role(job_role_key)
);

-- ----------------------------------------------------------------------------
-- 7. FACT: fact_pulse_survey_responses
-- ----------------------------------------------------------------------------
CREATE TABLE gold.fact_pulse_survey_responses (
    survey_key BIGINT IDENTITY(1,1) NOT NULL,
    date_key INT NOT NULL,
    employee_key INT NOT NULL,
    department_key INT NOT NULL,
    
    job_satisfaction_score TINYINT NOT NULL, -- 1-5 scale
    manager_relationship_score TINYINT NOT NULL, -- 1-5 scale
    work_life_balance_score TINYINT NOT NULL, -- 1-5 scale
    growth_opportunity_score TINYINT NOT NULL, -- 1-5 scale
    sentiment_polarity_score DECIMAL(4,3) NOT NULL, -- -1.000 to +1.000 from NLP
    humanized_summary_narrative NVARCHAR(MAX) NULL,
    
    CONSTRAINT pk_fact_pulse PRIMARY KEY CLUSTERED (survey_key),
    CONSTRAINT fk_pulse_date FOREIGN KEY (date_key) REFERENCES gold.dim_date(date_key),
    CONSTRAINT fk_pulse_emp FOREIGN KEY (employee_key) REFERENCES gold.dim_employee(employee_key),
    CONSTRAINT fk_pulse_dept FOREIGN KEY (department_key) REFERENCES gold.dim_department(department_key)
);
