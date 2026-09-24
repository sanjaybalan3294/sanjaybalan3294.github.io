// Portfolio Interactivity & Case Study Data for Sanjay Balan

// Project Deep-Dive Database
const projectsData = {
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
      'Customer Age Segment: Senior cohort (60+) forms the largest customer base with 1,807 policies, followed by 46-60 (1,110 policies).',
      'Policy Distribution: Health leads with 1,316 policies, followed by Property (1,236) and Life (1,234).',
      'Expiration Early Warning: 134 Property policies expire in 2026, pinpointing urgent renewal campaign priorities for retention teams.'
    ],
    stack: ['MySQL', 'Power BI', 'Tableau', 'DAX', 'SQL Aggregations', 'Data Modeling'],
    githubUrls: [
      { label: 'SQL Repository', url: 'https://github.com/sanjaybalan3294/Insurance-Analytics-SQL' },
      { label: 'Power BI Repository', url: 'https://github.com/sanjaybalan3294/Insurance-Analytics-PowerBI' },
      { label: 'Tableau Repository', url: 'https://github.com/sanjaybalan3294/Insurance-Analytics-Tableau' }
    ]
  },
  'movie-correlation': {
    title: 'Movie Industry Correlation & Revenue Analysis',
    badge: 'Statistical EDA & Econometrics',
    tagline: 'Investigating macro financial variables and audience engagement driving box office revenue.',
    metrics: [
      { label: 'Primary Correlation', value: 'r = 0.74' },
      { label: 'Vote Correlation', value: 'r = 0.61' },
      { label: 'Methodology', value: 'Pearson Matrix' },
      { label: 'Environment', value: 'Jupyter' }
    ],
    overview: 'Exploratory data analysis (EDA) and statistical correlation study on the movie industry dataset to isolate the economic drivers and audience indicators most tightly coupled to worldwide box office gross.',
    architecture: [
      { step: 'Data Cleansing & Preprocessing', desc: 'Treated missing records, resolved duplicate entries, standardized release dates and budgets, and validated data types.' },
      { step: 'Feature Correlation & Matrix Computation', desc: 'Computed Pearson correlation coefficients across numerical and categorical variables (budget, votes, score, runtime, year).' },
      { step: 'Statistical Visualizations', desc: 'Generated high-resolution correlation heatmaps, regression scatter plots with Seaborn, and categorical distribution charts.' }
    ],
    keyInsights: [
      'Production Budget is the single strongest predictor of gross earnings with a strong positive correlation of r = 0.74.',
      'Audience Votes demonstrated a significant secondary correlation of r = 0.61, highlighting the power of audience engagement.',
      'Metrics like IMDb score and runtime showed comparatively weaker direct linear correlations with total revenue.'
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

// Project Filter Tabs
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active tab styling
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white');
        b.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-slate-800/60');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white');
      btn.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-slate-800/60');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
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
