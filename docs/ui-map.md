# SkillGraph — User Interface Architecture & Screen Map

> **Document Version:** 1.0.0  
> **Source Reference:** `GoThrough.txt` (§ 1, § 2, § 3, § 4, § 6, § 7, § 8, § 10, § 17, § 20)  
> **Framework:** Next.js (App Router) + Modern CSS Design System (Sleek Dark Mode, Glassmorphism, Micro-Animations)

---

## 1. Application Routing Hierarchy

```text
app/
├── (marketing)/
│   └── page.tsx                     --> Route: / (Public Landing Page)
├── (auth)/
│   ├── login/page.tsx               --> Route: /login (AWS Cognito Sign-In)
│   ├── register/page.tsx            --> Route: /register (AWS Cognito Sign-Up)
│   └── callback/page.tsx            --> Route: /auth/callback (OAuth Token Exchange)
└── (dashboard)/
    ├── layout.tsx                   --> Authenticated Shell (Sidebar, TopNav, Chat Drawer)
    ├── dashboard/page.tsx           --> Route: /dashboard (Career Intelligence Command Center)
    ├── profile/page.tsx             --> Route: /profile (Target Role & Weekly Hours)
    ├── graph/page.tsx               --> Route: /graph (Interactive Skill Graph Canvas)
    ├── evidence/page.tsx            --> Route: /evidence (Resume Upload & GitHub Sync)
    ├── market/page.tsx              --> Route: /market (Market Radar & Job Demand)
    ├── gap/page.tsx                 --> Route: /gap (Career Gap & Leverage Matrix)
    ├── roadmap/page.tsx             --> Route: /roadmap (30-Day Learn-Build-Prove Sprint)
    └── institutional/page.tsx       --> Route: /institutional (Lightweight Cohort Demo)
```

---

## 2. Screen Specifications & Wireframe Layouts

### 2.1 Public Landing Page (`/`)
- **Header:** Logo ("SKILLGRAPH"), navigation anchors (`Features`, `Philosophy`, `Market Radar`), CTA button `[ Launch Your Graph ]`.
- **Hero Section:**
  - Headline: *"Your career is not a résumé. It's a continuously changing skill graph."* (GoThrough § 1)
  - Subheadline: *"Measure what you can demonstrate, uncover the real market gap, and execute the shortest practical path to your target role."*
  - Interactive Demo Preview: Live teaser of the Cloud Security Engineer gap radar.
  - CTAs: `[ Get Started Free ]` / `[ Explore Live Demo ]`.
- **Value Pillars:**
  1. *Demonstrate, Don't Claim:* Multi-source code and document evidence.
  2. *Live Market Grounding:* Real-time role demand without scrape noise.
  3. *Actionable 30-Day Sprints:* Time-budgeted Learn $\rightarrow$ Build $\rightarrow$ Prove execution.

---

### 2.2 Career Intelligence Command Center (`/dashboard`)
*Direct implementation of GoThrough.txt § 1 wireframe.*

```text
┌────────────────────────────────────────────────────────────────────────┐
│ SKILLGRAPH                                                🔔  SOMNATH  │
├──────────────┬─────────────────────────────────────────────────────────┤
│ [Dashboard]  │  YOUR CAREER INTELLIGENCE                               │
│ [Skill Graph]│                                                         │
│ [Evidence]   │  Active Target: [ Cloud Security Engineer  ▼ ]          │
│ [Market]     │                                                         │
│ [Gap Engine] │  Overall Career Readiness                               │
│ [30-Day Plan]│                     68%                                 │
│ [AI Agent]   │                ███████████████░░░░                      │
│              │                                                         │
│              │  Market Alignment: 74%  │  Evidence: 61%  │ Coverage: 72│
│              ├─────────────────────────────────────────────────────────┤
│              │  ⚠ 4 critical skill gaps identified                     │
│              │  ↑ 3 skills increasing in market demand                 │
│              │  ✓ 7 skills strongly supported by evidence               │
│              │                                                         │
│              │       [ View Career Graph ]     [ What Next Sprint ]    │
└──────────────┴─────────────────────────────────────────────────────────┘
```
- **Primary Widgets:**
  - **Readiness Meter:** Circular progress or dual-layer bar with real-time percentage.
  - **KPI Trio Cards:** Market Alignment (74%), Evidence Strength (61%), Skill Coverage (72%).
  - **Signal Feeds:** Critical gaps warning, accelerating market skills, verified credentials.
  - **Quick Action Bar:** One-click launch to Graph Visualization or Sprint Roadmap.

---

### 2.3 Interactive Skill Graph (`/graph`) (GoThrough.txt § 2)
- **Visual Canvas:** Directed acyclic graph (DAG) rendered with interactive nodes and dependency edges.
- **Node Tiers (Color-Coded by Evidence Strength):**
  - 🟢 **Strong ($\ge 75\%$):** Python, Linux (Solid border, glow).
  - 🟡 **Moderate ($40–74\%$):** AWS, Docker (Dashed border).
  - 🔴 **Weak / Critical Gap ($<40\%$):** IAM, Terraform, SIEM (Pulsing alert).
- **Node Detail Slide-over Panel:**
  - Skill name, category, and canonical taxonomy path.
  - Self-Reported vs. Evidence-Verified score comparison.
  - Discrete evidence citations (e.g., *"Detected in repo `iot-security`"*).
  - Downstream skills unlocked by mastering this node.

---

### 2.4 Evidence Hub (`/evidence`) (GoThrough.txt § 3, § 4)
- **Top Card: Resume Intelligence:**
  - Drag-and-drop S3 upload zone (PDF / DOCX, max 5MB).
  - Processing status badge (`Pending` $\rightarrow$ `Extracting via Bedrock` $\rightarrow$ `Synced`).
  - Extracted skills chip cloud with confidence indicators.
- **Bottom Card: GitHub Developer Intelligence:**
  - GitHub connection button / OAuth status indicator (`Connected as @somnath`).
  - Synced Repositories List with detected technical signals:
    - Language breakdown bars.
    - Cloud SDK calls detected (`boto3`, AWS CDK).
    - Testing framework detected (`pytest`, `jest`).
    - CI/CD workflow count.
- **Verification Score Ledger:** Table listing every claim alongside its verified evidence strength.

---

### 2.5 Market Radar (`/market`) (GoThrough.txt § 5, § 6)
- **Role Selector:** Cloud Security Engineer (default), DevOps Engineer, Cloud Architect.
- **Market Radar Grid:**
  | Skill | Market Demand | Velocity Trend | Your Current Evidence |
  |---|---|---|---|
  | **AWS IAM** | 82% `████████░░` | $\uparrow$ Rising | 31% (Critical Gap) |
  | **Terraform** | 61% `██████░░░░` | $\uparrow\uparrow$ Surging | 9% (High Leverage Gap) |
  | **Python** | 70% `███████░░░` | $\rightarrow$ Stable | 81% (Verified Strong) |
  | **SIEM** | 65% `██████░░░░` | $\uparrow$ Rising | 18% (Critical Gap) |
  | **Docker** | 55% `█████░░░░░` | $\rightarrow$ Stable | 62% (Verified Moderate) |
- **Dataset Attribution Footer:** Legal licensing notice and dataset currency timestamp.

---

### 2.6 Career Gap & Leverage Matrix (`/gap`) (GoThrough.txt § 7)
- **Comparative Visualizer:** Side-by-side bar chart showing candidate evidence percentage vs. target role market demand.
- **Leverage Calculator Card:**
  - Highlights *systemic unlocks* (e.g., explaining why learning Terraform unlocks 3 downstream security capabilities).
  - Ranked priority table: `Priority Rank = Raw Gap × Downstream Leverage × Market Trend`.

---

### 2.7 30-Day Sprint Roadmap (`/roadmap`) (GoThrough.txt § 8, § 9)
- **Constraint Configurator Bar:**
  - Time Budget Slider: `[ 5 hrs/wk ]` ── `[ 8 hrs/wk ]` ── `[ 15 hrs/wk ]`.
  - Sprint Duration: Fixed 30 days (4 weekly milestones).
- **Weekly Sprint Timeline:**
  - **Week 1 (Learn):** Conceptual mastery of top-ranked gap (e.g., IAM evaluation logic).
  - **Week 2 (Build - Part 1):** Scaffolding core implementation.
  - **Week 3 (Build - Part 2):** Terraform infrastructure automation.
  - **Week 4 (Prove):** Automated testing, public GitHub repo, architectural README.
- **Expected Proof Deliverables Card:** Anticipated evidence strength delta (+45% IAM, +50% Terraform).

---

### 2.8 AI Career Agent Chat Interface (`/agent` or Global Drawer) (GoThrough.txt § 10)
- **Interface:** Collapsible right-hand drawer accessible from any dashboard screen.
- **Pre-set One-Click Inquiries:**
  - `[ ❓ Why am I not ready for this role? ]`
  - `[ ⏱️ Recalculate for 5 hours per week ]`
  - `[ 🚀 What is my single highest-leverage skill? ]`
- **Response Structure:** Strict grounded formatting:
  1. Direct analytical conclusion.
  2. Evidence & gap citations.
  3. Actionable next step with link to `/roadmap`.

---

## 3. Design System Tokens & Aesthetics

- **Color Palette:**
  - Background Dark: `#0A0D14` (Deep obsidian)
  - Surface Glass: `rgba(18, 24, 38, 0.75)` with `backdrop-filter: blur(12px)`
  - Border Subdued: `rgba(255, 255, 255, 0.08)`
  - Accent Primary: `#3B82F6` (Electric Blue)
  - Accent Violet: `#8B5CF6` (AI / Bedrock operations)
  - Status Success (Strong Evidence): `#10B981` (Emerald Green)
  - Status Warning (Moderate Evidence): `#F59E0B` (Amber)
  - Status Alert (Critical Gap): `#EF4444` (Coral Red)
- **Typography:** Google Font `Inter` for data density and UI controls; `Outfit` for hero titles.

---

## 4. Acceptance Criteria for UI Map
- [x] Specifies Next.js routing hierarchy for marketing, auth, and all 8 authenticated dashboard views.
- [x] Faithfully reproduces GoThrough.txt § 1 ASCII home screen mockup.
- [x] Outlines all interactive controls needed for the 8-step live demo (§ 17).
- [x] Includes complete component inventory and design token palette.
