/**
 * EY Humanizer Platform - Interactive Front-End Engine
 * Handles analytics visualization, multi-agent copilot simulation, and humanized storytelling.
 */

// Sample Consultant Intervention Records (Mirrors Gold Mart)
const CONSULTANT_RECORDS = [
  {
    hash: "EY-a9f4c8e1",
    serviceLine: "Consulting",
    practice: "Technology Consulting",
    rank: "Senior Consultant",
    tenure: "28 mos",
    compaRatio: 0.84,
    monthlyOT: 38.5,
    burnout: 78,
    riskScore: 0.88,
    tier: "Critical",
    salary: 95000,
    verbatim: "Sustained 60+ hour sprints on cloud migration without manager recognition is draining me. Market recruiters are offering 25% higher base.",
    drivers: ["Compa-ratio lag (-16%)", "High uncredited overtime (38.5h/mo)", "Burnout index 78/100", "No promo in 28 mos"]
  },
  {
    hash: "EY-3b7d12f0",
    serviceLine: "Strategy & Transactions",
    practice: "Corporate Finance",
    rank: "Manager",
    tenure: "42 mos",
    compaRatio: 0.89,
    monthlyOT: 42.0,
    burnout: 82,
    riskScore: 0.84,
    tier: "Critical",
    salary: 140000,
    verbatim: "Closed 3 major deals in Q2 but deal bonuses felt completely disconnected from the actual sacrifice. Considering private equity move.",
    drivers: ["Incentive misalignment", "Overtime 42h/mo", "Severe deal fatigue", "Flight risk to PE"]
  },
  {
    hash: "EY-c56e89ab",
    serviceLine: "Consulting",
    practice: "Business Consulting",
    rank: "Staff",
    tenure: "14 mos",
    compaRatio: 0.91,
    monthlyOT: 24.0,
    burnout: 58,
    riskScore: 0.62,
    tier: "High",
    salary: 68000,
    verbatim: "Good team learning, but unclear progression path to Senior Consultant and offshore communication friction slows deliverables.",
    drivers: ["Career velocity uncertainty", "Offshore handoff friction", "Below-median compa (0.91)"]
  },
  {
    hash: "EY-7104d99c",
    serviceLine: "Tax",
    practice: "Global Compliance",
    rank: "Senior Manager",
    tenure: "64 mos",
    compaRatio: 0.96,
    monthlyOT: 29.5,
    burnout: 66,
    riskScore: 0.58,
    tier: "High",
    salary: 178000,
    verbatim: "Tax season compression was intense. Leadership changes disrupted team stability, need clarity on partner pipeline trajectory.",
    drivers: ["Leadership transition friction", "Partner pipeline ambiguity", "Seasonal burnout"]
  },
  {
    hash: "EY-ee1283fa",
    serviceLine: "Assurance",
    practice: "Audit Services",
    rank: "Senior Consultant",
    tenure: "31 mos",
    compaRatio: 0.86,
    monthlyOT: 34.0,
    burnout: 74,
    riskScore: 0.79,
    tier: "Critical",
    salary: 92000,
    verbatim: "Consecutive audit deadlines left zero recovery time. Compa-ratio is trailing tech consulting peers significantly.",
    drivers: ["Comp disparity vs Tech Consulting", "Back-to-back audit crunch", "Tenure at exit vulnerability"]
  },
  {
    hash: "EY-4f9a01c3",
    serviceLine: "Consulting",
    practice: "People Advisory Services",
    rank: "Manager",
    tenure: "36 mos",
    compaRatio: 0.98,
    monthlyOT: 18.0,
    burnout: 42,
    riskScore: 0.38,
    tier: "Medium",
    salary: 132000,
    verbatim: "Engaged with client transformation work, healthy autonomy. Seeking sponsorship for Gen AI executive leadership credentials.",
    drivers: ["Seeking executive credential support", "Stable workload"]
  },
  {
    hash: "EY-9821bb40",
    serviceLine: "Strategy & Transactions",
    practice: "Strategy & Execution",
    rank: "Assistant Director",
    tenure: "72 mos",
    compaRatio: 1.02,
    monthlyOT: 22.0,
    burnout: 48,
    riskScore: 0.32,
    tier: "Low",
    salary: 215000,
    verbatim: "Great strategic visibility on Fortune 500 digital engagement. Partner sponsorship is strong.",
    drivers: ["High engagement", "Above-market compa (1.02)", "Strong partner alignment"]
  }
];

// Pre-configured Query Scenarios for the Copilot
const COPILOT_SCENARIOS = {
  techConsulting: {
    query: "Analyze retention risk among Senior Consultants in Technology Consulting",
    filters: "Service Line: Consulting | Rank: Senior Consultant | Risk: High+",
    coldJson: `{\n  "cohort": "Consulting.Technology.SeniorConsultant",\n  "sample_size": 420,\n  "attrition_velocity_annualized": 0.284,\n  "mean_compa_ratio": 0.884,\n  "mean_monthly_overtime_hrs": 36.8,\n  "burnout_index_mean": 74.2,\n  "ml_flight_risk_p90": 0.82,\n  "stat_significance_p_val": "< 0.0001",\n  "primary_correlates": ["compa_ratio_deficit", "sustained_overtime_q3"]\n}`,
    execSummary: "Behind the 28.4% attrition spike among Technology Senior Consultants lies an acute talent crunch: consultants are operating at peak utilization (averaging 36.8 hours of monthly overtime on cloud architectures), while earning 11.6% below market benchmark. Replacing these 420 specialized practitioners carries an immediate commercial exposure of $59.8M in lost billings and recruiting costs.",
    humanStory: "These consultants are not disengaged by choice—they take pride in delivering mission-critical client systems. However, chronic sprint compression coupled with below-market compa-ratios fosters the feeling that their personal sacrifices are treated merely as margin cushions. When external tech recruiters reach out with 20%+ premiums, fatigue makes saying 'yes' effortless.",
    conversationGuide: [
      "1. Acknowledge Delivery Heroics: Open by celebrating specific architectural milestones delivered over the last quarter before reviewing hours or backlog.",
      "2. Explicitly Validate Workload Burnout: Ask: 'What part of our current sprint cadence feels most unmaintainable?' and listen without justification.",
      "3. Commit to Concrete Relief: Announce the immediate onboarding of 2 offshore squads to absorb testing and operational documentation by month-end.",
      "4. Proactive Equity Trajectory: Share their exact compensation band progression towards Manager rank, locking in a target mid-year equity true-up."
    ],
    playbook: [
      { pillar: "Workload Re-balancing", action: "Offload 25% of manual deployment and telemetry reporting to automated CI/CD and offshore squads.", impact: "Lowers burnout index from 74.2 to 52 within 30 days." },
      { pillar: "Compensation Equity True-Up", action: "Fast-track an out-of-cycle compa-ratio adjustment to 0.98 for high-performing Senior Consultants (Ratings 4-5).", impact: "Cuts projected flight risk by 42% across critical accounts." },
      { pillar: "Executive Sponsorship", action: "Assign Practice Partner sponsors for 1-on-1 bi-monthly career coaching toward Assistant Director readiness.", impact: "Elevates retention intent from 58% to 89%." }
    ],
    empathyScore: "4.9 / 5.0"
  },
  gurgaonHubs: {
    query: "Why is attrition spiking in Gurgaon & Bangalore delivery hubs?",
    filters: "Region: EMEIA/India (Gurgaon & Bangalore Delivery Centers)",
    coldJson: `{\n  "region": "India-GlobalDeliveryHubs",\n  "locations": ["Gurgaon", "Bangalore"],\n  "headcount": 2840,\n  "attrition_rate": 0.312,\n  "tenure_concentration": "14-26 months",\n  "compa_vs_local_gcc_index": 0.81,\n  "overtime_distribution_sd": 14.2,\n  "sentiment_polarity_mean": -0.42\n}`,
    execSummary: "India delivery hubs in Gurgaon and Bangalore are encountering heavy competitive poaching from Global Capability Centers (GCCs), compounded by an 8-hour time zone overlap that pushes client sync calls into late evenings. Attrition has climbed to 31.2%, heavily clustered around consultants with 14 to 26 months of tenure.",
    humanStory: "Engineers in Gurgaon and Bangalore frequently work 'double shifts'—daytime development followed by night-time client collaboration with US/UK stakeholders. While they appreciate EY's global brand prestige, competitor GCCs offer aggressive 25-35% increments with strict 40-hour work boundaries, creating severe retention headwinds.",
    conversationGuide: [
      "1. Normalize Time-Zone Boundaries: Establish strict 'No-Meeting Core Hours' after 8:00 PM IST to protect evening personal time.",
      "2. Celebrate Global Impact: Highlight how offshore architectural code directly drove the latest global client win.",
      "3. Career Mobility Pathways: Offer clear, funded pathways for short-term client onsite rotations in London and New York.",
      "4. Local Market Pay Band Review: Re-index local salary bands against top-quartile GCC benchmarks."
    ],
    playbook: [
      { pillar: "Time-Zone Governance", action: "Implement mandatory async handoffs and enforce no client meetings post-8 PM IST.", impact: "Improves work-life sentiment polarity from -0.42 to +0.31." },
      { pillar: "GCC Defense Comp Adjustments", action: "Target top 15% technical architects with retention bonuses vested over 18 months.", impact: "Protects core technical leadership across 12 flagship engagements." },
      { pillar: "Global Mobility Lottery", action: "Open 40 global secondment opportunities to EMEIA/Americas offices for top Indian performers.", impact: "Boosts 3-year retention commitment by 34%." }
    ],
    empathyScore: "4.8 / 5.0"
  },
  managerBurnout: {
    query: "Generate 1-on-1 retention playbook for burnt-out Manager cohort",
    filters: "Rank: Manager & Senior Manager | Burnout Index: > 70",
    coldJson: `{\n  "rank_cohort": ["Manager", "SeniorManager"],\n  "n_at_risk": 184,\n  "utilization_pct": 104.5,\n  "admin_reporting_burden_hrs": 14.8,\n  "regretted_turnover_exposure": 18400000,\n  "satisfaction_with_partner_support": 2.1\n}`,
    execSummary: "Managers represent the operational linchpin of our practice, currently squeezed between demanding client deliverables and junior staff attrition. Operating at 104.5% utilization while spending ~15 hours weekly on administrative project management, 184 Managers are at severe risk of burnout.",
    humanStory: "Managers are bearing the brunt of enterprise complexity. They are shielding junior staff from partner pressures while absorbing project slippage themselves. They express feeling isolated, lacking administrative support, and wondering if the demanding path to Partner is worth the toll on their well-being.",
    conversationGuide: [
      "1. Check In as a Fellow Human: Ask: 'How are you holding up personally under this deliverable load?' rather than starting with project status.",
      "2. Audit Low-Value Bureaucracy: Review their weekly calendar together and eliminate non-essential internal reporting meetings.",
      "3. Partner Accessibility: Guarantee weekly 30-minute Partner mentoring with zero interruptions.",
      "4. Wellness Sabbatical Option: Offer a pre-planned 1-week recharge leave immediately following client go-live."
    ],
    playbook: [
      { pillar: "Admin Automation", action: "Deploy automated project utilization and status reporting via Power Platform / Copilot.", impact: "Recovers 8 hours per week of high-value strategic capacity per Manager." },
      { pillar: "Partner Apprenticeship", action: "Pair each at-risk Manager with a designated Partner Sponsor for transparent pipeline tracking.", impact: "Reduces regretted managerial attrition from 22% to 9%." },
      { pillar: "Post-Project Recharge Bonus", action: "Award 3 compensatory wellness days + project milestone bonus upon major deployment.", impact: "Restores morale and emotional resilience." }
    ],
    empathyScore: "5.0 / 5.0"
  },
  equityAudit: {
    query: "Audit compensation parity across gender and tenure cohorts",
    filters: "Scope: Global | Dimensions: Gender, Tenure Cohort, Service Line",
    coldJson: `{\n  "audit_type": "Fairness_and_Pay_Equity",\n  "overall_adjusted_gender_pay_gap": "-0.012",\n  "tenure_compression_gap": "Significant in 3-5 Year Cohort",\n  "compa_ratio_new_hires_vs_tenured": "1.04 vs 0.94",\n  "statistical_bias_detected": "Negative tenure compression, no systemic gender gap (<1.5%)"\n}`,
    execSummary: "The pay equity audit indicates exemplary gender parity with an adjusted pay gap of -1.2% (well within global compliance thresholds). However, significant 'tenure compression' was identified: external new hires enter at a 1.04 compa-ratio, whereas loyal internal staff with 3-5 years of tenure average 0.94.",
    humanStory: "The true equity friction is tenure inversion. Loyal consultants who grew within EY observe newly recruited peers receiving premium market offers for identical rank responsibilities. This creates an unstated feeling that internal dedication is penalized relative to job-hopping.",
    conversationGuide: [
      "1. Transparency on Market Calibration: Acknowledge that rapid external talent inflation created tenure disparities that leadership is actively correcting.",
      "2. Proactive Salary Adjustment: Communicate that internal equity calibrations are scheduled to automatically adjust tenured cohorts.",
      "3. Focus on Fast-Track Promotion: Emphasize that internal tenure translates into faster partnership eligibility compared to lateral hires."
    ],
    playbook: [
      { pillar: "Tenure True-Up Fund", action: "Allocate a 2.5% dedicated payroll equity reserve to adjust staff with 3+ years tenure to market parity.", impact: "Eliminates tenure inversion friction for 620 high-performing consultants." },
      { pillar: "Internal Mobility Fast-Track", action: "Prioritize internal staff for lucrative client advisory and leadership roles before posting externally.", impact: "Reinforces organizational loyalty and psychological contract." }
    ],
    empathyScore: "4.9 / 5.0"
  }
};

// Application State
let currentScenario = COPILOT_SCENARIOS.techConsulting;
let selectedServiceLine = "All";

// DOM Elements & Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderKpis();
  renderTalentTable();
  initCharts();
  bindEvents();
  renderScenario(currentScenario);
});

function renderKpis() {
  // Can be dynamically updated based on filters
}

function renderTalentTable() {
  const tbody = document.getElementById("talentTableBody");
  if (!tbody) return;

  const filtered = selectedServiceLine === "All" 
    ? CONSULTANT_RECORDS 
    : CONSULTANT_RECORDS.filter(c => c.serviceLine === selectedServiceLine);

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td><span style="font-family: var(--font-mono); color: var(--ey-yellow);">${c.hash}</span></td>
      <td><strong>${c.serviceLine}</strong><br><span style="font-size: 11px; color: var(--text-dim);">${c.practice}</span></td>
      <td>${c.rank}</td>
      <td>${c.tenure}</td>
      <td><span style="color: ${c.compaRatio < 0.90 ? '#ef4444' : '#10b981'}; font-weight: 700;">${c.compaRatio.toFixed(2)}</span></td>
      <td>${c.monthlyOT}h</td>
      <td><span style="font-weight: 700; color: ${c.burnout > 70 ? '#ef4444' : '#f97316'};">${c.burnout}/100</span></td>
      <td><span class="badge-risk ${c.tier.toLowerCase()}">${c.tier} (${(c.riskScore * 100).toFixed(0)}%)</span></td>
      <td>
        <button class="action-btn" onclick="openInterventionModal('${c.hash}')">
          Humanize Plan ➔
        </button>
      </td>
    </tr>
  `).join("");
}

function initCharts() {
  // Chart 1: Attrition by Service Line
  const ctxDept = document.getElementById("chartDepartment");
  if (ctxDept && window.Chart) {
    new Chart(ctxDept, {
      type: "bar",
      data: {
        labels: ["Consulting", "Strategy & Tx", "Tax", "Assurance"],
        datasets: [{
          label: "Attrition Velocity %",
          data: [28.6, 26.2, 22.4, 25.1],
          backgroundColor: ["#ffe600", "#f97316", "#3b82f6", "#10b981"],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: "#2e2e40" }, ticks: { color: "#94a3b8" } },
          x: { ticks: { color: "#94a3b8" } }
        }
      }
    });
  }

  // Chart 2: Compa-Ratio vs Flight Risk
  const ctxCompa = document.getElementById("chartCompaRatio");
  if (ctxCompa && window.Chart) {
    new Chart(ctxCompa, {
      type: "line",
      data: {
        labels: ["< 0.85 (Critical)", "0.85-0.92 (Lagging)", "0.93-0.98 (Healthy)", "0.99-1.05 (Midpoint)", "> 1.05 (Premium)"],
        datasets: [{
          label: "Flight Risk Probability %",
          data: [78.4, 58.2, 34.1, 16.5, 9.2],
          borderColor: "#ffe600",
          backgroundColor: "rgba(255, 230, 0, 0.12)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#ffe600"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: "#2e2e40" }, ticks: { color: "#94a3b8" } },
          x: { ticks: { color: "#94a3b8" } }
        }
      }
    });
  }

  // Chart 3: Overtime vs Burnout Index
  const ctxOT = document.getElementById("chartOvertime");
  if (ctxOT && window.Chart) {
    new Chart(ctxOT, {
      type: "bar",
      data: {
        labels: ["0-10 hrs", "10-20 hrs", "20-30 hrs", "30-45 hrs", "45+ hrs"],
        datasets: [{
          label: "Average Burnout Index (0-100)",
          data: [24.0, 42.5, 62.0, 78.5, 91.2],
          backgroundColor: ["#10b981", "#3b82f6", "#f97316", "#ef4444", "#dc2626"],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: "#2e2e40" }, ticks: { color: "#94a3b8" } },
          x: { ticks: { color: "#94a3b8" } }
        }
      }
    });
  }

  // Chart 4: Pulse Sentiment Polarity
  const ctxSentiment = document.getElementById("chartSentiment");
  if (ctxSentiment && window.Chart) {
    new Chart(ctxSentiment, {
      type: "doughnut",
      data: {
        labels: ["Energized (+0.4 to +1.0)", "Neutral (-0.1 to +0.3)", "Strained (-0.8 to -0.2)"],
        datasets: [{
          data: [45, 32, 23],
          backgroundColor: ["#10b981", "#3b82f6", "#ef4444"],
          borderColor: "#1a1a24",
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: "#94a3b8", font: { size: 11 } } }
        }
      }
    });
  }
}

function bindEvents() {
  // Service Line Filter Dropdown
  const filterSelect = document.getElementById("serviceLineFilter");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      selectedServiceLine = e.target.value;
      renderTalentTable();
    });
  }

  // Copilot Ask Button
  const askBtn = document.getElementById("copilotSubmitBtn");
  const inputEl = document.getElementById("copilotInput");
  if (askBtn && inputEl) {
    askBtn.addEventListener("click", () => {
      const text = inputEl.value.trim();
      if (!text) return;
      handleCustomQuery(text);
    });
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const text = inputEl.value.trim();
        if (text) handleCustomQuery(text);
      }
    });
  }
}

function selectPromptChip(key) {
  if (COPILOT_SCENARIOS[key]) {
    currentScenario = COPILOT_SCENARIOS[key];
    const inputEl = document.getElementById("copilotInput");
    if (inputEl) inputEl.value = currentScenario.query;
    triggerAgentSimulation(currentScenario);
  }
}

function handleCustomQuery(query) {
  // Dynamically craft humanized scenario
  const customScenario = {
    query: query,
    filters: "Scope: Filtered by Custom Copilot Intent",
    coldJson: `{\n  "query_intent": "${query}",\n  "matched_records": 182,\n  "confidence_score": 0.94,\n  "burnout_flag": "Active",\n  "data_lake_status": "Gold Mart Synced"\n}`,
    execSummary: `Telemetry analysis for '${query}' indicates an acute concentration of project strain within this cohort. High performers are taking on outsized delivery responsibilities without proportional organizational sponsorship or workload offloading.`,
    humanStory: `When digging into open-text pulse survey verbatims, team members express profound commitment to EY clients, but report feeling invisible when project challenges arise. What appears on dashboards as a 'retention risk' is fundamentally an unaddressed cry for leadership presence and recognition.`,
    conversationGuide: [
      "1. Listen with Radical Curiosity: Ask them to describe their peak frustrations over the past month.",
      "2. Protect Personal Boundaries: Audit project deliverable deadlines and reschedule non-critical milestones.",
      "3. Clarify Long-Term Value: Articulate how their specific contributions are shaping the firm's client reputation."
    ],
    playbook: [
      { pillar: "Intervention", action: "Deploy automated project re-balancing and approve immediate compensatory time off.", impact: "Restores positive sentiment within 2 weeks." },
      { pillar: "Recognition", action: "Schedule Partner recognition session and review annual equity positioning.", impact: "Eliminates flight vulnerability." }
    ],
    empathyScore: "4.9 / 5.0"
  };
  triggerAgentSimulation(customScenario);
}

function triggerAgentSimulation(scenario) {
  const traceEl = document.getElementById("agentTrace");
  if (traceEl) {
    traceEl.innerHTML = `
      <div class="agent-step active">⏳ [DataExtractionAgent] Querying Azure Synapse Gold Tables...</div>
    `;
    setTimeout(() => {
      traceEl.innerHTML = `
        <div class="agent-step done">✓ [DataExtractionAgent] Fetched Gold Records</div>
        <div class="agent-step active">⏳ [RiskDiagnosticAgent] Synthesizing ML Feature Weights...</div>
      `;
    }, 400);
    setTimeout(() => {
      traceEl.innerHTML = `
        <div class="agent-step done">✓ [DataExtractionAgent] Fetched Gold Records</div>
        <div class="agent-step done">✓ [RiskDiagnosticAgent] Root Causes Isolated</div>
        <div class="agent-step active">⏳ [HumanizerStorytellerAgent] Translating Data into Empathy Playbook...</div>
      `;
    }, 800);
    setTimeout(() => {
      traceEl.innerHTML = `
        <div class="agent-step done">✓ [DataExtractionAgent] Gold Telemetry Ingested</div>
        <div class="agent-step done">✓ [RiskDiagnosticAgent] Predictive Drivers Classified</div>
        <div class="agent-step done">✓ [HumanizerStorytellerAgent] Narrative Crafted</div>
        <div class="agent-step done">✓ [GovernanceEthicsAgent] GDPR & Bias Audit: PASSED (SAFE)</div>
      `;
      renderScenario(scenario);
    }, 1200);
  } else {
    renderScenario(scenario);
  }
}

function renderScenario(scenario) {
  const coldEl = document.getElementById("coldJsonDisplay");
  if (coldEl) coldEl.textContent = scenario.coldJson;

  const summaryEl = document.getElementById("narrativeSummary");
  if (summaryEl) summaryEl.textContent = scenario.execSummary;

  const humanEl = document.getElementById("narrativeHuman");
  if (humanEl) humanEl.textContent = scenario.humanStory;

  const guideEl = document.getElementById("narrativeGuide");
  if (guideEl) {
    guideEl.innerHTML = scenario.conversationGuide.map(item => `<li>${item}</li>`).join("");
  }

  const playbookEl = document.getElementById("narrativePlaybook");
  if (playbookEl) {
    playbookEl.innerHTML = scenario.playbook.map(p => `
      <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border-left: 2px solid var(--ey-yellow);">
        <strong style="color: var(--ey-yellow); font-size: 12px; text-transform: uppercase;">[${p.pillar}]</strong>
        <p style="margin: 4px 0; font-size: 13px;">${p.action}</p>
        <span style="font-size: 11px; color: var(--accent-green); font-weight: 600;">➔ Target Impact: ${p.impact}</span>
      </div>
    `).join("");
  }

  const empathyEl = document.getElementById("empathyScoreDisplay");
  if (empathyEl) empathyEl.textContent = scenario.empathyScore || "4.9 / 5.0";
}

// Modal for Individual Consultant Intervention
function openInterventionModal(hash) {
  const consultant = CONSULTANT_RECORDS.find(c => c.hash === hash);
  if (!consultant) return;

  const modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeModal(event)">&times;</button>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
          <div class="ey-logo-badge" style="font-size: 16px; padding: 4px 10px;">EY</div>
          <div>
            <h2 style="font-size: 18px; font-weight: 700;">Humanized Retention Blueprint: ${consultant.hash}</h2>
            <p style="font-size: 12px; color: var(--text-muted);">${consultant.rank} • ${consultant.serviceLine} (${consultant.practice})</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
          <div style="background: var(--bg-surface-elevated); padding: 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 11px; color: var(--text-dim); text-transform: uppercase;">Compa-Ratio</div>
            <div style="font-size: 18px; font-weight: 700; color: ${consultant.compaRatio < 0.90 ? '#ef4444' : '#10b981'};">${consultant.compaRatio.toFixed(2)}</div>
            <div style="font-size: 10px; color: var(--text-dim);">${consultant.compaRatio < 0.90 ? 'Deficit vs Market' : 'At Benchmark'}</div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 11px; color: var(--text-dim); text-transform: uppercase;">Monthly Overtime</div>
            <div style="font-size: 18px; font-weight: 700; color: #f97316;">${consultant.monthlyOT} hrs</div>
            <div style="font-size: 10px; color: var(--text-dim);">Uncredited Pace</div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 11px; color: var(--text-dim); text-transform: uppercase;">Flight Risk Model</div>
            <div style="font-size: 18px; font-weight: 700; color: #ef4444;">${(consultant.riskScore * 100).toFixed(0)}%</div>
            <div style="font-size: 10px; color: #ef4444;">Tier: ${consultant.tier}</div>
          </div>
        </div>

        <div style="background: rgba(255, 230, 0, 0.05); border: 1px solid var(--border-active); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h4 style="font-size: 12px; text-transform: uppercase; color: var(--ey-yellow); margin-bottom: 6px;">Qualitative Pulse Verbatim (Anonymized)</h4>
          <p style="font-style: italic; font-size: 13px; color: #cbd5e1;">"${consultant.verbatim}"</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">Key Retention Vulnerabilities</h4>
          <ul class="guide-list">
            ${consultant.drivers.map(d => `<li>${d}</li>`).join("")}
          </ul>
        </div>

        <div style="background: var(--bg-primary); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--ey-yellow); margin-bottom: 8px;">Manager 1-on-1 Action Script</h4>
          <p style="font-size: 13px; line-height: 1.6; color: #e2e8f0;">
            "Schedule a private coffee catch-up this week outside project scrum. 
            Begin by saying: <em>'I wanted to personally thank you for holding the fort on our client deliverables—I see how much effort you have poured in. 
            I also notice that our current workload pace has been heavy, and I want to ensure we support you before fatigue sets in. 
            Let us look at re-allocating tasks and aligning your mid-year compensation review.'</em>"
          </p>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="chip-btn" onclick="closeModal(event)">Close</button>
          <button class="copilot-btn" onclick="confirmIntervention('${consultant.hash}')">
            ✓ Log Humanized Retention Intervention
          </button>
        </div>
      </div>
    </div>
  `;
}

function closeModal(e) {
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) modalContainer.innerHTML = "";
}

function confirmIntervention(hash) {
  alert(`[HUMANIZER] Retention intervention action plan successfully scheduled for consultant ${hash}. Practice Leadership and People Partner notified.`);
  closeModal();
}
