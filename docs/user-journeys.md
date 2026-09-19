# SkillGraph — User Journeys Specification

> **Document Version:** 1.0.0  
> **Source Reference:** `GoThrough.txt` (§ 1, § 3, § 4, § 7, § 8, § 13, § 14, § 17)  
> **Core Focus:** End-to-end walkthrough for the Individual Candidate (MVP Demo Path) + SaaS Institutional Extensions.

---

## 1. Primary Journey: Individual Candidate (GoThrough.txt § 17)

The Individual journey embodies the core product loop:
$$\text{Understand Me} \longrightarrow \text{Understand Market} \longrightarrow \text{Find Gap} \longrightarrow \text{Tell Me What to Do} \longrightarrow \text{Prove I Improved}$$

```text
  [ 1. Onboarding ] ──> [ 2. Resume Ingestion ] ──> [ 3. GitHub Analysis ]
                                                             │
                                                             ▼
  [ 6. AI Agent Reasoning ] <── [ 5. Market Radar ] <── [ 4. Skill Graph ]
         │
         ├──> [ 7. 30-Day Sprint Plan ]
         │
         └──> [ 8. Dynamic Time Recalculation ] ("The Wow Moment")
```

---

### Step-by-Step Flow

#### Step 1: Onboarding & Role Selection (GoThrough.txt § 17, Step 1)
- **User Action:** Candidate registers via AWS Cognito, enters profile details, and selects target career role: **Cloud Security Engineer**.
- **System State:** Creates user entity in DynamoDB (`PK: USER#{userId}`, `SK: PROFILE`). Sets initial readiness baseline to 0%. Prompts candidate to substantiate claims with evidence.

#### Step 2: Resume Ingestion & Evidence Extraction (GoThrough.txt § 17, Step 2)
- **User Action:** Candidate uploads their existing PDF/DOCX resume via secure S3 pre-signed URL.
- **System State:**
  - S3 emits event $\rightarrow$ EventBridge $\rightarrow$ SQS $\rightarrow$ Worker Lambda.
  - Worker calls Amazon Bedrock to extract technical proficiencies, tools, and domain experience.
  - Bedrock outputs normalized canonical skills: `Python`, `Linux`, `Networking`, `AWS`, `IoT`, `Cybersecurity`.
  - DynamoDB stores evidence line items tagged `sourceType: RESUME`.

#### Step 3: Developer Code Evidence Connection (GoThrough.txt § 17, Step 3)
- **User Action:** Candidate clicks `[ Connect GitHub ]` and authorizes read-only OAuth access.
- **System State:**
  - GitHub Worker Lambda inspects candidate's authorized repositories.
  - Detects multi-repo signals: `AWS SDK`, `Python`, `Docker`, `REST APIs`, `SQL`, test suites, and CI/CD pipelines.
  - Evidence strength recalculates: Python self-claim (Advanced) backed by 8 repos and testing detected $\rightarrow$ Evidence Strength increases to **82% (Strong)**.
  - Kubernetes self-claim (Intermediate) backed by 0 repos or deployments $\rightarrow$ Evidence Strength remains **17% (Insufficient)**.

#### Step 4: Interactive Skill Graph Rendering (GoThrough.txt § 17, Step 4)
- **User Action:** Candidate views the visual Skill Graph canvas.
- **System State:** Renders dependency network with color-coded confidence indicators:
  - **Strong ($\ge 75\%$):** `Python`, `Linux`.
  - **Moderate ($40-74\%$):** `AWS`, `Docker`.
  - **Weak / Critical Gap ($<40\%$):** `IAM`, `Terraform`, `SIEM`.

#### Step 5: Market Intelligence & Radar Alignment (GoThrough.txt § 17, Step 5)
- **User Action:** Candidate toggles to the **Market Radar** view.
- **System State:** System overlays current job market demand metrics for *Cloud Security Engineer*:
  - `AWS IAM`: **82% Demand** (High, Trend $\uparrow$)
  - `Terraform`: **61% Demand** (High, Trend $\uparrow\uparrow$)
  - `SIEM`: **65% Demand** (Medium/High, Trend $\uparrow$)
  - `AWS Security Services`: **91% Demand** (Very High, Trend $\uparrow$)
- **Aggregate Metrics Updated:** Market Alignment: **74%**, Evidence Strength: **61%**, Overall Readiness: **68%**.

#### Step 6: "Why Am I Not Ready?" AI Agent Reasoning (GoThrough.txt § 17, Step 6)
- **User Action:** Candidate clicks `[ Why am I not ready? ]` in the AI Career Agent interface.
- **System State:**
  - Bedrock Career Agent executes grounded tools: `get_skill_graph(userId)`, `get_market_data("Cloud Security Engineer")`, `get_gap_analysis(userId)`.
  - Agent synthesizes evidence without hallucination:
    > *"Your strongest verified evidence lies in Python, Linux, and REST development. However, for a Cloud Security Engineer role, your critical gaps are AWS IAM, Terraform, and SIEM security monitoring. Specifically, Terraform is your highest-leverage gap: mastering declarative infrastructure enables you to automate AWS security controls and unlock downstream security project evidence."*

#### Step 7: 30-Day Sprint Generation (GoThrough.txt § 17, Step 7)
- **User Action:** Candidate clicks `[ Build my 30-day plan ]` with an 8 hours/week time budget.
- **System State:** Roadmap engine computes a 4-week "Learn $\rightarrow$ Build $\rightarrow$ Prove" execution sprint:
  - **Week 1 (Learn):** AWS IAM fundamentals, policy evaluation logic, and permission boundaries.
  - **Week 2 (Build):** Deploy least-privilege AWS architecture with cross-account role delegation.
  - **Week 3 (Build):** Terraform infrastructure as code with integrated security linting (`tfsec`).
  - **Week 4 (Prove):** Deploy, document, and publish an automated *Cloud Security Monitoring Platform* repo to GitHub.
  - **Expected Outcome:** Closes 3 critical gaps, boosts evidence strength to $>78\%$.

#### Step 8: Dynamic Constraint Recalculation — "The Wow Moment" (GoThrough.txt § 17, Step 8)
- **User Action:** Candidate enters: *"What happens if I only have 5 hours per week?"*
- **System State:**
  - Career Agent calls roadmap recalculation tools with updated constraint parameter ($T = 5\text{ hrs/wk}$).
  - System dynamically compresses the sprint scope, isolates the single highest-leverage node (IAM + basic Terraform), shifts the complex multi-account project into Month 2, and produces an executable 5-hour weekly timetable.
  - **Demo Impact:** Demonstrates that SkillGraph is an intelligent analytical engine reasoning from real constraints, not static canned text.

---

## 2. Institutional Journey: University Cohort Analytics (GoThrough.txt § 13, § 14)

*Note: Lightweight demonstration mode for Hackathon v1.*

- **Target Persona:** Computer Science Department Chair or University Career Placement Director.
- **Goal:** Understand curriculum efficacy against live hiring market demand.
- **Journey Flow:**
  1. **Institution Login:** Accesses the institutional view aggregating student cohorts (e.g., "Class of 2027 — Cloud Computing Specialization").
  2. **Cohort Skill Coverage:** Dashboard displays aggregate readiness distribution across student body.
  3. **Curriculum Gap Detection:** Highlights that 85% of students have strong Python/Linux evidence, but $<12\%$ have verified IaC or cloud security evidence.
  4. **Employability Trend Radar:** Shows shifting employer requirements before students graduate.

---

## 3. Enterprise Journey: Internal Mobility & Upskilling (GoThrough.txt § 13, § 14)

*Note: Lightweight demonstration mode for Hackathon v1.*

- **Target Persona:** VP of Engineering or Technical Talent Lead.
- **Goal:** Identify internal candidates ready to transition into high-demand cloud security roles without external hiring.
- **Journey Flow:**
  1. **Enterprise Dashboard:** Selects target organizational role opening (e.g., *Senior Cloud Security Architect*).
  2. **Internal Candidate Matching:** System scans internal engineering skill graphs to locate adjacent talent (e.g., Backend Python developers with 60%+ skill adjacency).
  3. **Targeted Upskilling Roadmaps:** Generates customized 60-day internal upskilling sprints for transition candidates.

---

## 4. Acceptance Criteria for User Journeys
- [x] Accurately maps the complete 8-step live demo script from `GoThrough.txt` § 17.
- [x] Formulates the exact prompt, tool interactions, and expected responses for the AI Career Agent.
- [x] Captures the "Learn → Build → Prove" philosophy throughout the candidate sprint.
- [x] Outlines lightweight institutional and enterprise extensions (§ 13, § 14) without expanding MVP scope.
