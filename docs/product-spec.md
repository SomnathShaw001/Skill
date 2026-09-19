# SkillGraph — Master Product Specification v1

> **Document Version:** 1.0.0  
> **Source Reference:** `GoThrough.txt` (§ 1 to § 10, § 14, § 15)  
> **Target Lane & Tag:** `#startup` / `#commercial-potential`  
> **Primary Core Loop:** Understand Me → Understand the Market → Find My Gap → Tell Me What to Do → Prove I Improved

---

## 1. Product Overview & North Star

SkillGraph is an AI-powered career intelligence platform designed around one foundational question (GoThrough.txt § 1):

> **"Given what I can actually prove today and what the market is asking for, what should I do next?"**

SkillGraph rejects the static resume and generic course recommendations. Instead, it measures what a candidate can **demonstrate**, not merely what they claim, compares demonstrable capability against real-time market demand, and outputs an executable, prioritized sprint to close critical skill gaps.

---

## 2. Target Persona & User Modes (GoThrough.txt § 13, § 14)

### 2.1 Individual (Primary for Hackathon MVP)
- **Profile:** Software engineer, student, or cloud practitioner targeting career advancement or transition (e.g., target role: *Cloud Security Engineer*).
- **Core Needs:**
  - Realistic readiness assessment backed by evidence.
  - Clarity on what specific skills employers demand right now.
  - Actionable, time-budgeted sprints (e.g., "I have 8 hours/week. What do I do for the next 30 days?").
  - Proof that completed work actually moved the needle on their career graph.

### 2.2 Institutional / SaaS Modes (Lightweight Demo / Long-term Architecture)
- **University:** Cohort tracking, role readiness distributions, placement analytics.
- **Enterprise:** Internal mobility, team capability mapping, targeted upskilling.
- *MVP Scope Rule:* Hackathon v1 supports the Individual mode fully, with a lightweight demonstration of institutional aggregation. Do not build full enterprise multi-tenancy in v1.

---

## 3. Product Features & Detailed Specifications

### 3.1 Home Screen & Dashboard (GoThrough.txt § 1)
Upon authentication, the user lands on the Career Intelligence Command Center:
- **Header:** User identity, active target role selector, system notifications.
- **Career Readiness Score:** Aggregate percentage calculation:
  $$\text{Readiness} = w_m \cdot \text{Market Alignment} + w_e \cdot \text{Evidence Strength} + w_c \cdot \text{Skill Coverage}$$
- **Key Metrics:**
  - **Market Alignment (%):** Overlap between candidate’s verified skills and high-demand role skills.
  - **Evidence Strength (%):** Weighted ratio of demonstrable evidence vs. self-reported claims.
  - **Skill Coverage (%):** Percentage of target role required capabilities addressed at minimum proficiency.
- **Alert Highlights:**
  - Critical skill gaps count (e.g., "⚠ 4 critical skill gaps").
  - Demand momentum indicators (e.g., "↑ 3 skills increasing in market demand").
  - Verified credentials (e.g., "✓ 7 skills strongly supported by evidence").
- **Primary CTA:** `[ View Career Graph ]` / `[ What Should I Do Next? ]`.

---

### 3.2 The Skill Graph (GoThrough.txt § 2)
The skill graph is a directed dependency network representing hierarchical and lateral relationships across technical domains:
- **Hierarchical Decomposition (Example for Cloud Security Engineer):**
  - **Cloud:** AWS (IAM, Security Services, VPC), Azure, GCP.
  - **Security:** IAM, SIEM, SOC Operations, Vulnerability Management, Compliance.
  - **Engineering:** Python, Linux, Docker, Infrastructure as Code (Terraform).
- **Node Attributes:**
  - `skillId`: Unique canonical identifier.
  - `name`: Human-readable name.
  - `proficiencyLevel`: Beginner, Intermediate, Advanced, Expert.
  - `marketDemand`: Normalized 0–100 score derived from job postings.
  - `evidenceStrength`: 0–100 score based on verified artifacts.
  - `confidenceScore`: Statistical certainty based on multi-source cross-referencing.
  - `dependencies`: Upstream prerequisites (e.g., Terraform requires Cloud & IaC basics).
  - `trend`: Velocity indicator (`↑↑`, `↑`, `→`, `↓`).

---

### 3.3 Evidence Philosophy & Scoring Engine (GoThrough.txt § 3)
A candidate’s skill is split into two dimensions: **Self-Reported Claim** vs. **Demonstrated Evidence**.

#### Evidence Sources:
1. **Resume / CV:** Extracted work experience, project descriptions, declared tools.
2. **GitHub Repositories:** Code written, libraries imported, infrastructure manifests, test coverage.
3. **Certifications & Courses:** Validated external credentials.
4. **Manual Artifacts:** Technical writeups, architecture diagrams, deployments.

#### Evidence Strength Classification:
- **Strong ($\ge 75\%$):** Multi-source corroboration (e.g., Python: 8 repos, unit tests detected, API endpoints, production deployment).
- **Moderate ($40\% - 74\%$):** Single solid source or partial repository evidence without tests/CI.
- **Weak ($1\% - 39\%$):** Mentioned in text only; no code or deployment artifact found.
- **Insufficient ($0\%$):** Claimed without any supporting artifact.

---

### 3.4 GitHub Intelligence Engine (GoThrough.txt § 4)
When a user connects their GitHub account, the engine scans authorized repositories to extract deep engineering signals:
- **Signal Extraction Taxonomy:**
  - **Languages:** Primary and secondary languages via file distribution and byte counts.
  - **Frameworks & Libraries:** Detected via manifest files (`package.json`, `requirements.txt`, `go.mod`, `pom.xml`).
  - **Cloud Services & APIs:** AWS SDK calls, boto3 clients, REST endpoints, GraphQL schemas.
  - **Databases & Storage:** SQL migrations, ORM schemas, DynamoDB/MongoDB configurations.
  - **Infrastructure as Code:** Terraform (`.tf`), AWS CloudFormation, CDK, Dockerfiles, Compose files.
  - **Testing & Quality:** Test directory presence, PyTest/Jest configurations, test coverage evidence.
  - **CI/CD & DevOps:** GitHub Actions workflows (`.github/workflows`), Docker builds.
  - **Security Best Practices:** Environment variable management, secrets avoidance, linting configurations.
- **Graph Update:** Extracted signals directly feed into the user's Evidence Graph with specific commit/repository provenance.

---

### 3.5 Job Market Intelligence & Market Radar (GoThrough.txt § 5, § 6)
- **Ingestion:** Curated, legally compliant job specification dataset for tech domains.
- **Normalization:** Raw job requirements are parsed and mapped to canonical SkillGraph taxonomy nodes.
- **Demand Calculation:** Occurrence frequency within target role postings weighted by recency.
- **Trend Velocity:** Rolling trajectory comparison (e.g., Terraform accelerating $\uparrow\uparrow$, Docker stable $\rightarrow$).
- **Market Radar View:** Interactive visual table displaying skill, market demand bar, and direction vector.

---

### 3.6 Career Gap & Leverage Engine (GoThrough.txt § 7)
- **Direct Gap:** Difference between required market baseline and user’s evidence level:
  $$\text{Gap}(s) = \max(0, \text{MarketDemand}(s) - \text{UserEvidence}(s))$$
- **Leverage & Dependency Multiplier:**
  Skills are not evaluated in isolation. A skill that acts as a dependency for multiple downstream high-demand skills receives higher prioritization.
  - *Example:* Learning `Terraform` unlocks `AWS Infrastructure Automation` $\rightarrow$ unlocks `Security Infrastructure` $\rightarrow$ enables `Cloud Security Projects`. Terraform therefore has high systemic leverage.

---

### 3.7 "What Should I Do Next?" Engine (GoThrough.txt § 8, § 9)
Converts cold analytical gaps into a time-budgeted execution sprint.
- **Input Parameters:**
  - Target role.
  - Available weekly commitment (e.g., 5 hrs/week vs. 8 hrs/week vs. 15 hrs/week).
  - Current verified skill baseline.
  - Target sprint duration (typically 30 days / 4 weeks).
- **The Learn $\rightarrow$ Build $\rightarrow$ Prove Framework:**
  - **Week 1 (Learn):** Targeted conceptual mastery of the highest-leverage gap.
  - **Week 2 (Build - Part 1):** Scaffolding core implementation.
  - **Week 3 (Build - Part 2):** Integrating infrastructure and services.
  - **Week 4 (Prove):** Automated testing, deployment, public documentation, and push to GitHub.
- **Dynamic Recalculation:** Changing the weekly time budget immediately adjusts the scope, granularity, and timeline of the recommended sprint.

---

### 3.8 AI Career Agent (GoThrough.txt § 10)
An evidence-grounded AI agent powered by Amazon Bedrock:
- **Operating Constraints:** The agent cannot hallucinate or invent qualifications. It is restricted to tool invocations querying:
  1. `get_skill_graph(userId)`
  2. `get_market_data(targetRole)`
  3. `get_gap_analysis(userId, targetRole)`
- **Key Workflows:**
  - *"Why am I not ready for this role?"* $\rightarrow$ Synthesizes target role demands against missing evidence and highlights leverage points.
  - *"Recalculate for 5 hours/week"* $\rightarrow$ Invokes planning tools to compress sprint scope while preserving the highest-leverage node.

---

## 4. MVP Scope Boundaries (GoThrough.txt § 15)

### In-Scope (Strict Deliverables)
- Responsive Next.js Web App with modern UI.
- Cognito User Authentication & Session Management.
- User Profile with Target Role Configuration.
- Visual Skill Graph Component with Interactive Node Details.
- S3 Document Upload + Bedrock Resume Extraction Pipeline.
- GitHub Integration + Repo Evidence Parsing.
- Curated Market Dataset + Market Radar Display.
- Algorithmic Career Gap Calculation with Dependency Weighting.
- 30-Day Sprint Generator with Time-Budget Adjustment.
- Bedrock Career Agent with Tool Grounding.
- Live AWS Production Deployment over HTTPS.

### Out-of-Scope for Hackathon MVP
- Native mobile applications (iOS/Android).
- Social networking, peer comparison, public profiles.
- Automated job application / resume dispatching bots.
- Learning Management System (LMS) hosting videos or courses directly.
- Recruiter marketplaces or billing/monetization systems.

---

## 5. Acceptance Criteria for Specification
- [x] Every feature in this specification references specific sections of `GoThrough.txt`.
- [x] No extraneous or unverified features introduced beyond the approved MVP list.
- [x] Clear mathematical and architectural grounding for skill scoring, evidence strength, and sprint planning.
