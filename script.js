// Portfolio Interactivity & Case Study Data for Sanjay Balan

// Project Deep-Dive Database
const projectsData = {
  'ey-humanizer': {
    title: 'HUMANIZER | Enterprise People Analytics & Agentic AI Platform',
    badge: 'Flagship Enterprise Consulting Platform (EY C&I)',
    tagline: 'Azure Lakehouse Medallion architecture, predictive flight risk ML (ROC-AUC 0.81), and autonomous multi-agent copilot translating data into empathetic leadership action.',
    metrics: [
      { label: 'Workforce Records', value: '6,000' },
      { label: 'ML ROC-AUC', value: '0.811' },
      { label: 'Agent Squad', value: '4 Agents' },
      { label: 'At-Risk Capital', value: '$126.2M' }
    ],
    overview: 'Engineered specifically for enterprise consulting (EY Clients & Industries and People Advisory Services), HUMANIZER bridges the critical gap where raw HR statistics fail to drive change. It combines an Azure Synapse Kimball star-schema lakehouse, Gradient Boosting flight risk classification, and an autonomous Copilot Studio multi-agent squad (DataExtraction, RiskDiagnostic, HumanizerStoryteller, and GovernanceEthics) to turn cold telemetry into empathetic, executive-ready retention playbooks and 1-on-1 manager conversation guides.',
    architecture: [
      { step: 'Tier 1: Medallion Lakehouse ETL (Azure Synapse)', desc: 'Engineered Bronze raw ingestion, Silver GDPR SHA-256 salted pseudonymization, and Gold Kimball star schema marts (dim_employee SCD Type 2, dim_department, fact_attrition_risk, fact_engagement_pulse).' },
      { step: 'Tier 2: Predictive Flight Risk & Burnout ML', desc: 'Trained Gradient Boosting ensemble classifier achieving 0.811 ROC-AUC, isolating burnout velocity (41.6%), compa-ratio deficits (7.3%), and overtime strain (11.5%).' },
      { step: 'Tier 3: Autonomous Multi-Agent Copilot Squad', desc: 'Constructed an autonomous 4-agent workflow that retrieves Gold marts, pinpoints root-cause drivers, generates empathetic executive narratives with 1-on-1 conversation scripts, and audits for GDPR & algorithmic fairness.' },
      { step: 'Tier 4: Executive Decision-Support Dashboard & Power BI', desc: 'Designed interactive corporate dashboard featuring live KPI counters, Chart.js trend curves, and the signature Humanizer Studio with one-click consultant retention playbooks.' }
    ],
    keyInsights: [
      'Proved that high utilization (>95%) combined with compa-ratio deficits (<0.90) drives 74% of voluntary attrition among Senior Consultants.',
      'Identified severe burnout concentration in Global Delivery Hubs (Gurgaon & Bangalore) due to asynchronous time-zone compression.',
      'Demonstrated that empathetic, structured 1-on-1 manager interventions protect up to $59.8M in avoided recruitment and attrition exposure.'
    ],
    stack: ['Azure Synapse', 'Python 3.12', 'Scikit-Learn', 'SQL Star Schema', 'Power BI / DAX', 'Multi-Agent AI', 'GDPR Security'],
    githubUrls: [
      { label: 'Live Interactive Dashboard', url: 'humanizer-people-analytics/dashboard/index.html' },
      { label: 'Browse Code & Architecture', url: 'humanizer-people-analytics/README.md' }
    ]
  },
  'credit-risk': {
    title: 'Enterprise Credit Risk & Loan Portfolio Intelligence Platform',
    badge: 'Banking Analytics & Risk Intelligence',
    tagline: 'Production-grade banking analytics platform modeling $434.81M+ in lending capital, default/delinquency segregation, and branch liquidity surveillance across 165,535 records.',
    metrics: [
      { label: 'Capital Exposure', value: '$434.81M' },
      { label: 'Records Analyzed', value: '165,535' },
      { label: 'Delinquency Surge', value: '6.6x (A➔G)' },
      { label: 'AML Outflows Flagged', value: '5,252 Txns' }
    ],
    overview: 'An enterprise-grade Banking Decision Management & Credit Risk Analytics platform engineered to ingest, clean, standardize, model, and visualize 165,535 records spanning $434.81M+ in funded lending exposure and $254.89M in retail cash flows across six regional bank branches. Incorporates Basel III/Dodd-Frank surveillance principles, SQL window analytics (DENSE_RANK), high-velocity AML debit outflow rules, and dual-axis Tableau dashboards.',
    architecture: [
      { step: 'Tier 1: High-Volume ETL & Data Normalization (Pandas/openpyxl)', desc: 'Dual-workbook ingestion processing 65.5k loan accounts (52 attributes) and 100k retail transactions with regex column sanitization, duplicate header elimination, and ISO-8601 temporal standardization.' },
      { step: 'Tier 2: Vectorized AML Risk Engine & Decision Rules', desc: 'Engineered vectorized rule np.where((Transaction_Type == "Debit") & (Amount > 4500), 1, 0) isolating 5,252 high-risk outbound debit transfers exceeding regulatory reporting thresholds.' },
      { step: 'Tier 3: Relational SQL Risk Modeling (MySQL 8.0 & SQLAlchemy)', desc: 'Built PyMySQL connection pool streaming cleaned datasets into MySQL. Authored advanced queries with CTEs and DENSE_RANK() window functions to evaluate Grade A-G credit risk and branch net liquidity.' },
      { step: 'Tier 4: Tableau Decision Management BI Suite', desc: 'Constructed Tableau Public workbook with dual-axis synchronized risk marks (exposure bars vs delinquency/default trend lines), US geographic underwriting choropleth map, and interactive cross-filtering by grade and disbursement year.' }
    ],
    keyInsights: [
      'Proved that while baseline default rates remain stable between 2.38% and 2.96%, delinquency serves as the primary leading indicator of credit deterioration, surging 6.6x from Grade A (3.92%) to Grade G (25.95%).',
      'Identified severe liquidity bifurcation where surplus branches (East, Suburban, North: +$699.8k) contrast with deficit branches (Downtown, City Center, Main: -$381.7k), recommending automated EoD Zero-Balance Account sweeps.',
      'Main Branch (902 flags) and Downtown Branch (901 flags) accounted for 34.3% of all high-risk debit transactions over $4,500, isolating institutional AML compliance exposure.'
    ],
    stack: ['Python 3.12', 'MySQL 8.0', 'Tableau Public', 'Pandas', 'SQLAlchemy', 'PyMySQL', 'Window Functions', 'ETL Pipeline'],
    githubUrl: 'https://github.com/sanjaybalan3294/Enterprise-Credit-Risk-Loan-Portfolio-Intelligence'
  },
  'ai-workforce': {
    title: 'AI Workforce Intelligence & Disruption Analytics',
    badge: 'Flagship AICTE | IBM SkillsBuild Project',
    tagline: 'Production-ready 4-tier analytics ladder and machine learning model forecasting employment displacement.',
    metrics: [
      { label: 'Workforce Records', value: '30,000' },
      { label: 'Global Regions', value: '8 Markets' },
      { label: 'Industry Sectors', value: '8 Verticals' },
      { label: 'Loss Matrix Penalty', value: '5.3x FN Ratio' }
    ],
    overview: 'As artificial intelligence and automated systems rapidly permeate across global industry sectors, workforce planners and policymakers face critical structural shifts in employment demand. This project executes a rigorous 4-Tier Analytics Ladder on 30,000 labor records to identify contraction risks, prevent lookahead leakage, and build resource-constrained operational intervention frameworks.',
    architecture: [
      { step: 'Tier 1: Data Hygiene & Feature Engineering', desc: 'Normalized headers, resolved character encodings, validated domain boundaries (salary > 0, exp 0-20 yrs), and engineered metrics like Automation Exposure Index & Net Projected Growth.' },
      { step: 'Tier 2: Diagnostic Analytics (Levels 1 & 2)', desc: 'Built 5 high-impact visualizations examining salary vs automation risk, remote work penetration, and educational cohort shifts with strict separation of correlation vs causation.' },
      { step: 'Tier 3: Predictive Modeling & Strict Leakage Guardrails', desc: 'Defined Decline_Risk_Flag target. Excluded future-dated 2030 projections and high-cardinality titles to prevent lookahead leakage. Evaluated Logistic Regression and Random Forest.' },
      { step: 'Tier 4: Prescriptive Operational Decision Engine', desc: 'Developed a resource-constrained triage engine with dynamic probability thresholds and a 3-tier intervention playbook for corporate reskilling.' }
    ],
    keyInsights: [
      'High compensation does not offer structural insulation from AI automation (Finance & IT high-wage cognitive roles share similar vulnerability to physical roles).',
      'Remote roles are digitized knowledge workflows, presenting lower friction for software agent integration.',
      'Commercial loss analysis demonstrated that False Negatives (~$18.5k/employee) are ~5.3x more costly than False Positives (~$3.5k/employee), prompting a lowered decision threshold (τ ≈ 0.40).'
    ],
    stack: ['Python 3.12', 'Scikit-Learn', 'Streamlit', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/sanjaybalan3294/AI-Workforce-Analytics-Job-Disruption-Intelligence'
  },
  'hr-analytics': {
    title: 'HR Workforce & Attrition Analytics Suite',
    badge: 'Cross-Platform Analytics Suite',
    tagline: 'End-to-end workforce retention diagnostics across MySQL, Power BI, and Tableau.',
    metrics: [
      { label: 'Employees Analyzed', value: '50,000' },
      { label: 'Baseline Attrition', value: '50.21%' },
      { label: 'Overtime Cohort', value: '24,861' },
      { label: 'Avg Working Exp', value: '~20 Years' }
    ],
    overview: 'A full-stack HR analytics system analyzing 50,000 employee records to uncover the primary drivers of voluntary employee turnover, compensation disparities, and work-life balance deterioration across business units.',
    architecture: [
      { step: 'Relational SQL Modeling (MySQL)', desc: 'Engineered complex aggregations, window functions, conditional CASE statements, and multi-table joins to benchmark salary bands, overtime ratios, and promotion timelines.' },
      { step: 'Power BI Business Intelligence Dashboard', desc: 'Modeled DAX measures for dynamic attrition calculation, headcount trends, and department drill-downs with responsive slicers.' },
      { step: 'Tableau Executive Visualizations', desc: 'Constructed an interactive Tableau dashboard comparing work-life balance scores across roles, promotion velocity, and gender demographic parity.' }
    ],
    keyInsights: [
      'Isolated extreme attrition risk directly among 24,861 employees working regular overtime.',
      'Identified an overall baseline turnover rate of 50.21%, with significant variance across specific department clusters.',
      'Work-life balance ratings remained consistently compressed (2.47 to 2.51 across 5) across multiple critical business roles.'
    ],
    stack: ['MySQL', 'Power BI', 'Tableau', 'DAX', 'Power Query', 'Data Modeling', 'Excel'],
    githubUrls: [
      { label: 'SQL Repository', url: 'https://github.com/sanjaybalan3294/HR-Analytics-SQL' },
      { label: 'Power BI Repository', url: 'https://github.com/sanjaybalan3294/HR-Analytics-PowerBI' },
      { label: 'Tableau Repository', url: 'https://github.com/sanjaybalan3294/HR-Analytics-Tableau' }
    ]
  },
  'insurance-analytics': {
    title: 'Insurance Portfolio Risk & Claims Analytics',
    badge: 'Actuarial & Business Intelligence',
    tagline: 'Comprehensive risk, policy expiration, and claims liability modeling across MySQL, Power BI, and Tableau.',
    metrics: [
      { label: 'Total Policies', value: '5,000' },
      { label: 'Unique Customers', value: '3,148' },
      { label: 'Claims Analyzed', value: '₹251.38M' },
      { label: '2026 Expiring', value: '134 Property' }
    ],
    overview: 'An actuarial intelligence dashboard suite analyzing 5,000 policies and ₹251M+ in claim liability to empower underwriting teams with proactive expiration forecasting, customer demographic segmentation, and premium trends.',
    architecture: [
      { step: 'SQL Data Pipeline (MySQL)', desc: 'Queried multi-table schema linking policies, customers, claims, and payment records. Answered 10 key executive business questions using aggregations and filters.' },
      { step: 'Power BI Portfolio Modeler', desc: 'Crafted data models evaluating premium-to-claim ratios, demographic distributions, and payment settlement rates.' },
      { step: 'Tableau Interactive Dashboard', desc: 'Designed interactive visualizations featuring customer age cohort slices, policy type breakdowns, and expiration timeline trackers.' }
    ],
    keyInsights: [
      'Extracted and analyzed 5,000 policies across 3,148 customers using complex SQL joins, CTEs, and window functions across 4 relational tables to aggregate policyholder cohorts.',
      'Flagged 134 high-risk policies expiring in 2026 through date-range filtering, isolating concentration risk within Property coverage.',
      'Quantified INR 251M+ in total claims and tracked annual premium trends to identify key inflection points in portfolio growth.',
      'Designed an interactive 15-visual Power BI dashboard displaying policyholder demographics, claim frequency, and regional distribution.'
    ],
    stack: ['MySQL', 'Power BI', 'Tableau', 'DAX', 'SQL Aggregations', 'Data Modeling', 'Star Schema'],
    githubUrls: [
      { label: 'SQL Repository', url: 'https://github.com/sanjaybalan3294/Insurance-Analytics-SQL' },
      { label: 'Power BI Repository', url: 'https://github.com/sanjaybalan3294/Insurance-Analytics-PowerBI' },
      { label: 'Tableau Repository', url: 'https://github.com/sanjaybalan3294/Insurance-Analytics-Tableau' }
    ]
  },
  'movie-correlation': {
    title: 'Movie Industry Data Analysis',
    badge: 'Python & Statistical Modeling',
    tagline: 'Exploratory data analysis identifying primary drivers of box office gross revenue.',
    metrics: [
      { label: 'Budget Correlation', value: 'r = 0.74' },
      { label: 'Vote Correlation', value: 'r = 0.61' },
      { label: 'Methodology', value: 'Pearson Matrix' },
      { label: 'Environment', value: 'Jupyter' }
    ],
    overview: 'Conducted end-to-end exploratory data analysis on movie industry datasets, performing data cleaning, duplicate checks, and missing-value treatment. Evaluated correlation across numerical and categorical features to identify primary revenue drivers.',
    architecture: [
      { step: 'Data Cleansing & Preprocessing', desc: 'Treated missing records, resolved duplicate entries, standardized release dates and budgets, and validated data types.' },
      { step: 'Feature Correlation & Matrix Computation', desc: 'Computed Pearson correlation coefficients across numerical and categorical variables (budget, votes, score, runtime, year).' },
      { step: 'Statistical Visualizations', desc: 'Developed regression plots and correlation heatmaps to visualize complex feature relationships and extract key business patterns.' }
    ],
    keyInsights: [
      'Conducted end-to-end exploratory data analysis on movie industry datasets, performing data cleaning, duplicate checks, and missing-value treatment.',
      'Evaluated correlation across numerical and categorical features, identifying budget (0.74) and audience votes (0.61) as primary revenue drivers.',
      'Developed regression plots and correlation heatmaps to visualize complex feature relationships and extract key business patterns.'
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    githubUrl: 'https://github.com/sanjaybalan3294/Movie-Correlation-Analysis-Python'
  }
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProjectFilters();
  initCounters();
  initContactModal();
  initProjectModal();
  initSmoothScroll();
});

// Theme Management (Dark / Light)
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('sanjay-portfolio-theme');

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.documentElement.classList.contains('light')) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('sanjay-portfolio-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('sanjay-portfolio-theme', 'light');
      }
    });
  }
}

// Project Filter Tabs & Live Instant Search
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const noProjectsFound = document.getElementById('no-projects-found');

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const cardText = card.innerText.toLowerCase();

      const matchesCategory = (currentCategory === 'all') || categories.includes(currentCategory);
      const matchesSearch = !searchQuery || keywords.includes(searchQuery) || cardText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = ''; // Restore flexbox layout
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    if (noProjectsFound) {
      if (visibleCount === 0) {
        noProjectsFound.classList.remove('hidden');
      } else {
        noProjectsFound.classList.add('hidden');
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white');
        b.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-slate-800/60');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white');
      btn.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-slate-800/60');

      currentCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }
      applyFilters();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        applyFilters();
      }
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      currentCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.add('hidden');

      filterBtns.forEach(b => {
        if (b.getAttribute('data-filter') === 'all') {
          b.classList.add('active', 'bg-blue-600', 'text-white');
          b.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-slate-800/60');
        } else {
          b.classList.remove('active', 'bg-blue-600', 'text-white');
          b.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-slate-800/60');
        }
      });
      applyFilters();
    });
  }
}

// Project Deep Dive Modal
function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const closeBtn = document.getElementById('close-project-modal');
  const triggerBtns = document.querySelectorAll('.view-project-details');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const project = projectsData[projectId];
      if (!project) return;

      renderProjectModal(project);
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeContactModal();
    }
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

function renderProjectModal(project) {
  const container = document.getElementById('modal-dynamic-content');
  if (!container) return;

  let linksHtml = '';
  if (project.githubUrls) {
    linksHtml = project.githubUrls.map(item => `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
         class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        ${item.label}
      </a>
    `).join('');
  } else if (project.githubUrl) {
    linksHtml = `
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
         class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        View GitHub Repository
      </a>
    `;
  }

  container.innerHTML = `
    <div class="mb-4">
      <span class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-2">
        ${project.badge}
      </span>
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">${project.title}</h2>
      <p class="text-slate-400 text-sm sm:text-base">${project.tagline}</p>
    </div>

    <!-- Quick Metrics Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      ${project.metrics.map(m => `
        <div class="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
          <div class="text-lg sm:text-xl font-bold text-blue-400 font-mono">${m.value}</div>
          <div class="text-xs text-slate-400 mt-1">${m.label}</div>
        </div>
      `).join('')}
    </div>

    <!-- Overview Section -->
    <div class="my-6">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-blue-500"></span> Executive Summary & Business Scope
      </h3>
      <p class="text-slate-300 leading-relaxed text-sm sm:text-base">${project.overview}</p>
    </div>

    <!-- Architecture & Methodology -->
    <div class="my-6">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-indigo-500"></span> Technical Architecture & Methodology
      </h3>
      <div class="space-y-3">
        ${project.architecture.map(a => `
          <div class="p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/40">
            <h4 class="text-sm font-semibold text-white mb-1">${a.step}</h4>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">${a.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Key Insights -->
    <div class="my-6">
      <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Key Business Insights & Empirical Findings
      </h3>
      <ul class="space-y-2">
        ${project.keyInsights.map(k => `
          <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
            <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>${k}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- Tech Stack Tags -->
    <div class="my-6 pt-4 border-t border-slate-800">
      <div class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">Tools & Libraries Deployed</div>
      <div class="flex flex-wrap gap-2">
        ${project.stack.map(s => `
          <span class="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-mono">${s}</span>
        `).join('')}
      </div>
    </div>

    <!-- Action Links -->
    <div class="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
      ${linksHtml}
    </div>
  `;
}

// Contact Modal & Clipboard Copy
function initContactModal() {
  const contactModal = document.getElementById('contact-modal');
  const triggerBtns = document.querySelectorAll('.open-contact-modal');
  const closeBtn = document.getElementById('close-contact-modal');
  const copyBtn = document.getElementById('copy-email-btn');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeContactModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'sanjaybalan3294@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied email to clipboard!');
      }).catch(() => {
        showToast('Email: sanjaybalan3294@gmail.com');
      });
    });
  }
}

function closeContactModal() {
  const contactModal = document.getElementById('contact-modal');
  if (contactModal) {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) return;

  const toastText = document.getElementById('toast-text');
  if (toastText) toastText.textContent = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Animated Numerical Counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const duration = 1800; // ms
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = prefix + target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('impact-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Smooth Scrolling for In-Page Anchor Links
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
