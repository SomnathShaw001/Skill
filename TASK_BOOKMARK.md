# SkillGraph — Task Bookmark & Phase Guide

> **Ground Truth Source:** `GoThrough.txt` (1298 lines, fully read).
> This file is the ONLY authoritative task list. The coding agent must read this file at the start of every session.

---

## 🔒 Agent Operating Rules (Read Before Every Task)

These rules come directly from GoThrough.txt § 19 & § 22. They exist to prevent hallucination and scope creep.

1. **Do not invent requirements.** Every feature must be traceable to a GoThrough.txt section number.
2. **Before each task:** identify the exact file, goal, and acceptance check.
3. **Make the smallest change needed** for the current authorized task.
4. **Run the narrowest useful validation** immediately after each change.
5. **Report exactly:** what file changed, what was verified, and any blocker.
6. **Do not change** architecture, dependencies, database schema, authentication, or AWS resources unless explicitly authorized by the user.
7. **Do not skip ahead** to a later phase. Complete the current checkpoint first.
8. **Keep these living documents updated:** `docs/agent-log.md`, `docs/aws-connection-proof.md`.
9. **One vertical slice at a time.** Ship it. Deploy it. Then move to the next.
10. **Every agent session begins with:** reading `/docs/product-spec.md`, `/docs/architecture.md`, and `/docs/agent-rules.md`.

---

## 📌 Product North Star (GoThrough.txt § 1)

> **"Given what I can actually prove today and what the market is asking for, what should I do next?"**

**Core loop (never deviate from this):**

```
Understand me → Understand the market → Find my gap → Tell me what to do → Prove I improved
```

**Philosophy:** SkillGraph measures what you can **demonstrate**, not merely what you **claim**.

---

## 🏗️ Architecture Summary (GoThrough.txt § 11)

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js | UI |
| Auth | AWS Cognito | Identity |
| API | AWS API Gateway | Routing |
| Compute | AWS Lambda | Serverless functions |
| Database | AWS DynamoDB | User graph, skill data |
| Storage | AWS S3 | Resume/document upload |
| AI | Amazon Bedrock | Skill extraction, reasoning, plans |
| Events | AWS EventBridge + SQS | Async GitHub/job processing |
| Monitoring | AWS CloudWatch | Logs, metrics, alerts |

> **Rule:** Do not add an AWS service unless it has a specific job listed above.

---

## 📦 MVP Scope (GoThrough.txt § 15)

### ✅ Must Have (build these, nothing else)
- [ ] Landing page
- [ ] Authentication (Cognito)
- [ ] User profile
- [ ] Target role selection
- [ ] Skill graph (schema + visualization)
- [ ] Resume upload → S3 → Bedrock → skill extraction → graph update
- [ ] GitHub OAuth → repository analysis → evidence extraction → graph update
- [ ] Job-market dataset (curated/legally accessible)
- [ ] Market skill demand & trend analysis
- [ ] Career gap engine (user graph vs. market graph)
- [ ] Personalized roadmap (30/60/90-day plan)
- [ ] AI Career Agent (grounded in graph + evidence + market data)
- [ ] Dashboard (Career Readiness %, Market Alignment %, Evidence Strength %)
- [ ] AWS production deployment (public HTTPS URL)

### 🟡 Nice to Have (only after Must Have is complete)
- Certifications tracking
- Learning integrations
- Progress tracking
- PDF career report
- University dashboard (lightweight demo only)

### 🚫 Absolutely Not for v1
- Mobile app
- Social network
- Job application automation
- Full LMS
- Recruiter marketplace
- Payment system
- Dozens of integrations

---

## 📅 Phase Plan (GoThrough.txt § 21)

### ─────────────────────────────────────
### PHASE 1 — Foundation & Specification
### Days 1–2 | No feature coding
### ─────────────────────────────────────

#### DAY 1 — Product + Architecture (GoThrough.txt § 21 / DAY 1)
- [x] **1.1** Create `docs/product-spec.md` — full product specification
  - Covers: home screen layout (§1), skill graph model (§2), evidence philosophy (§3), GitHub intelligence (§4), job market (§5), market radar (§6), gap engine (§7), "what next" engine (§8), Learn→Build→Prove cycle (§9), career agent (§10)
- [x] **1.2** Create `docs/architecture.md` — AWS architecture diagram + service list (§11)
- [x] **1.3** Create `docs/database-design.md` — DynamoDB data model: Users, Skills, Evidence, Markets, Gaps, Roadmaps
- [x] **1.4** Create `docs/security-model.md` — Cognito, IAM roles, data isolation, GitHub OAuth scopes
- [x] **1.5** Create `docs/agent-rules.md` — the exact agent instruction from GoThrough.txt § 22 (lines 1289–1290)
- [x] **1.6** Create `docs/agent-log.md` — development log template
- [x] **1.7** Define user journeys: Individual / (placeholder for University & Company)
- [x] **1.8** Define UI map: Landing → Auth → Dashboard → Profile → Graph → Evidence → Market → Gap → Roadmap → Agent

**Acceptance check:** All 8 docs exist, are non-empty, are self-consistent, and reference GoThrough.txt sections.

---

#### DAY 2 — AWS Foundation (GoThrough.txt § 21 / DAY 2)
- [x] **2.1** AWS account/environment setup & verify access
- [x] **2.2** IAM roles and least-privilege policies (one role per Lambda function)
- [x] **2.3** Create GitHub repository with folder structure from § 20
- [x] **2.4** Set up infrastructure-as-code (CDK or SAM — decision must be logged in agent-log.md)
- [x] **2.5** Cognito User Pool + App Client
- [x] **2.6** API Gateway skeleton (no routes yet, just the gateway)
- [x] **2.7** Deploy **"Hello SkillGraph"** — a public HTTPS URL that returns the product name
- [x] **2.8** Log AWS connection proof in `docs/aws-connection-proof.md` (screenshot + URL)

**Acceptance check:** Public URL returns a live response. URL is documented.

---

### ─────────────────────────────────────
### PHASE 2 — Application Core
### Days 3–4
### ─────────────────────────────────────

#### DAY 3 — Application Foundation (GoThrough.txt § 21 / DAY 3)
- [ ] **3.1** Landing page with product headline and sign-up CTA
- [ ] **3.2** Authentication flow (Cognito sign-up, sign-in, sign-out)
- [ ] **3.3** Dashboard shell (Career Readiness %, Market Alignment %, Evidence Strength % — can be mock data)
- [ ] **3.4** User profile screen
- [ ] **3.5** Target role selection (input + store in DynamoDB)
- [ ] **3.6** Navigation between all screens
- [ ] **3.7** Deploy to AWS

**Acceptance check:** User can sign up, sign in, set a target role, and see the dashboard. All deployed and accessible via public URL.

---

#### DAY 4 — Skill Graph (GoThrough.txt § 21 / DAY 4 + §2, §3)
- [ ] **4.1** DynamoDB skill schema: `skillId`, `name`, `category`, `level`, `marketDemand`, `evidenceStrength`, `confidence`, `dependencies`, `trend`
- [ ] **4.2** Seed data: skills for "Cloud Security Engineer" target role (AWS, IAM, Terraform, SIEM, Docker, Python, Linux, Kubernetes)
- [ ] **4.3** Skill graph visualization component (nodes + edges, evidence color-coded: Strong/Moderate/Weak/Insufficient)
- [ ] **4.4** Evidence model: self-reported vs. evidence-backed confidence score
- [ ] **4.5** Skill detail panel (shows evidence, market demand, confidence — see § 3 example)

**Acceptance check:** User can see their skill graph. Clicking a skill shows its evidence and demand data. No hallucinated skills or data.

---

### ─────────────────────────────────────
### PHASE 3 — Intelligence Engines
### Days 5–7
### ─────────────────────────────────────

#### DAY 5 — Resume Intelligence (GoThrough.txt § 21 / DAY 5 + §3, §15)
- [ ] **5.1** Resume upload UI → S3 (pre-signed URL pattern)
- [ ] **5.2** S3 upload triggers Lambda via EventBridge or S3 event
- [ ] **5.3** Lambda calls Amazon Bedrock to extract skills from resume text
- [ ] **5.4** Extracted skills mapped to canonical skill schema (normalization)
- [ ] **5.5** DynamoDB updated with extracted skills + evidence source = "resume"
- [ ] **5.6** Skill graph re-renders with new evidence

**Acceptance check:** Upload a real PDF resume. Bedrock extracts skills. Graph updates. Evidence source shows "resume". No invented skills.

---

#### DAY 6 — GitHub Intelligence (GoThrough.txt § 21 / DAY 6 + §4)
- [ ] **6.1** GitHub OAuth flow (authorized scopes: read:user, repo — no write permissions)
- [ ] **6.2** Fetch authorized repositories list
- [ ] **6.3** Per-repository analysis Lambda: detect languages, frameworks, cloud services, APIs, databases, infrastructure, testing, CI/CD (see §4 signal tree)
- [ ] **6.4** Evidence extraction → map to canonical skills
- [ ] **6.5** DynamoDB updated with evidence source = "github:{repo-name}"
- [ ] **6.6** Skill graph re-renders showing GitHub evidence

**Acceptance check:** GitHub connected. At least one repo analyzed. Skill evidence updated with repo source. No hallucinated repositories or skills.

---

#### DAY 7 — Market Intelligence (GoThrough.txt § 21 / DAY 7 + §5, §6)
- [ ] **7.1** Select curated/legally accessible job dataset — document source and license in `docs/architecture.md`
- [ ] **7.2** Job skill extraction Lambda (Bedrock or pattern matching)
- [ ] **7.3** Skill normalization (map job skills to canonical skill schema)
- [ ] **7.4** Calculate demand score per skill per target role
- [ ] **7.5** Calculate trend (up ↑↑, up ↑, flat →, down ↓)
- [ ] **7.6** Store in DynamoDB market table
- [ ] **7.7** Market Radar page: skill vs. demand vs. trend (see §6 example)

**Acceptance check:** Market Radar page shows real demand data for the target role. Source is documented. Data is not invented.

---

### ─────────────────────────────────────
### PHASE 4 — Gap & Roadmap Engines
### Days 8–9
### ─────────────────────────────────────

#### DAY 8 — Career Gap Engine (GoThrough.txt § 21 / DAY 8 + §7)
- [ ] **8.1** Gap calculation: user skill score vs. market demand score per skill
- [ ] **8.2** Dependency graph traversal: identify which skills unlock downstream skills (e.g., Terraform → AWS infra → Security infra → Cloud Security projects)
- [ ] **8.3** Priority ranking: gaps sorted by (gap size × leverage × market demand)
- [ ] **8.4** Career Gap page: YOUR SKILL vs. MARKET column view (see §7 example)

**Acceptance check:** Gap page shows real comparison. Terraform's leverage over downstream skills is calculated. No invented gap data.

---

#### DAY 9 — Roadmap Engine (GoThrough.txt § 21 / DAY 9 + §8, §9)
- [ ] **9.1** Convert prioritized gaps into Learn → Build → Prove steps
- [ ] **9.2** Time constraint input: hours/week
- [ ] **9.3** 30/60/90-day plan generation (Bedrock prompt grounded in actual gap data)
- [ ] **9.4** Roadmap page: weekly breakdown (see §8 example: WEEK 1 IAM, WEEK 2 Monitoring, WEEK 3 Terraform, WEEK 4 Build project)
- [ ] **9.5** Plan recalculates when hours/week changes (the "wow moment" from §17 Step 8)

**Acceptance check:** Plan is generated from real gap data. Changing hours/week changes the plan. Output is not generic AI text.

---

### ─────────────────────────────────────
### PHASE 5 — AI Career Agent
### Day 10
### ─────────────────────────────────────

#### DAY 10 — Career Agent (GoThrough.txt § 21 / DAY 10 + §10)
- [ ] **10.1** Bedrock agent with three grounded tools:
  - `get_skill_graph(userId)` — returns user's actual skill + evidence data
  - `get_market_data(targetRole)` — returns market demand + trend
  - `get_gap_analysis(userId, targetRole)` — returns prioritized gap list
- [ ] **10.2** Agent system prompt: "You are SkillGraph's career agent. Only answer using the data returned by your tools. Do not invent skills, evidence, or market data."
- [ ] **10.3** "Why am I not ready?" question → agent calls tools → evidence-backed answer (see §17 Step 6 example)
- [ ] **10.4** "Build my 30-day plan" → agent calls tools → grounded plan
- [ ] **10.5** Agent chat UI embedded in dashboard

**Acceptance check:** Agent answers "Why am I not ready?" with only data present in DynamoDB. Agent does not hallucinate skills or market figures.

---

### ─────────────────────────────────────
### PHASE 6 — Security, Production & Pitch
### Days 11–13
### ─────────────────────────────────────

#### DAY 11 — Security + Testing (GoThrough.txt § 21 / DAY 11)
- [ ] **11.1** Authentication: verify protected routes redirect to sign-in
- [ ] **11.2** Authorization: verify user A cannot read user B's data
- [ ] **11.3** Data isolation: DynamoDB partition key = userId, verify no cross-user leakage
- [ ] **11.4** GitHub permissions: verify only authorized repos are read, no write access
- [ ] **11.5** File uploads: verify only PDF/DOCX accepted, max file size enforced, no code execution from uploads
- [ ] **11.6** Prompt injection: test agent with adversarial inputs ("ignore previous instructions...")
- [ ] **11.7** AI hallucination check: verify agent only returns data present in tools' responses
- [ ] **11.8** API security: verify unauthenticated API calls return 401
- [ ] **11.9** Invalid input: verify form validation catches bad data
- [ ] **11.10** Rate limits: verify Lambda concurrency limits are set
- [ ] **11.11** Error handling: verify errors return user-friendly messages, not stack traces

**Acceptance check:** All 11 security checks pass. Document results in `docs/testing.md`.

---

#### DAY 12 — Production (GoThrough.txt § 21 / DAY 12)
- [ ] **12.1** Freeze functionality — no new features after this point
- [ ] **12.2** Production AWS environment (separate from dev if possible)
- [ ] **12.3** HTTPS enforced on public URL
- [ ] **12.4** Demo account created with pre-loaded evidence (resume + GitHub)
- [ ] **12.5** End-to-end demo run in clean browser (incognito, no cached state)
- [ ] **12.6** CloudWatch dashboard: monitor errors and latency during demo
- [ ] **12.7** Document deployment in `docs/deployment.md`

**Acceptance check:** Demo runs cleanly in incognito. Public HTTPS URL is live. CloudWatch shows no errors.

---

#### DAY 13 — Pitch + Submission (GoThrough.txt § 21 / DAY 13)
- [ ] **13.1** 90-second demo script (follows §17 Steps 1–8 exactly)
- [ ] **13.2** 3-minute extended demo script
- [ ] **13.3** README: what SkillGraph does, why AWS, how to run, live URL
- [ ] **13.4** Architecture diagram (matches `docs/architecture.md`)
- [ ] **13.5** AWS connection proof screenshots (from `docs/aws-connection-proof.md`)
- [ ] **13.6** Coding-agent development log (from `docs/agent-log.md`)
- [ ] **13.7** Screenshots of all major screens
- [ ] **13.8** Impact story (one paragraph: the problem → the solution → measurable outcome)
- [ ] **13.9** Builder Center submission: set category tag `#commercial-potential`, lane tag `#startup`
- [ ] **13.10** Submit **before the final 2 hours** (deadline: October 2, 2026)

**Acceptance check:** Submission confirmed in Builder Center. All required evidence attached.

---

## 📍 Current Checkpoint

**Status:** Day 2 COMPLETE (AWS Foundation, IAM, CDK Stack, Cognito, API Gateway, and Hello SkillGraph verified).

**Next authorized task:** `3.1` — Landing page with product headline and sign-up CTA (Phase 2 / Day 3: Application Foundation).

**Waiting for:** User command to begin Day 3.

---

## 🗂️ Repository Structure (GoThrough.txt § 20)

```
skillgraph/
│
├── app/              ← Next.js pages
├── components/       ← UI components
├── lib/              ← Shared utilities
├── services/         ← API service clients
├── agents/           ← Bedrock agent definitions
├── database/         ← DynamoDB schema + seed data
├── infrastructure/   ← CDK/SAM IaC
├── tests/            ← Unit + integration tests
├── scripts/          ← Build/deploy scripts
│
├── docs/
│   ├── product-spec.md        ← DAY 1 task 1.1
│   ├── architecture.md        ← DAY 1 task 1.2
│   ├── database-design.md     ← DAY 1 task 1.3
│   ├── security-model.md      ← DAY 1 task 1.4
│   ├── agent-rules.md         ← DAY 1 task 1.5
│   ├── agent-log.md           ← DAY 1 task 1.6
│   ├── aws-connection-proof.md← DAY 2 task 2.8
│   ├── testing.md             ← DAY 11
│   ├── deployment.md          ← DAY 12
│   └── demo-script.md         ← DAY 13
│
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## 💬 Demo Script Summary (GoThrough.txt § 17)

| Step | Action | What agent must show |
|------|--------|----------------------|
| 1 | Create user, set target role: Cloud Security Engineer | Profile saved |
| 2 | Upload resume | AI extracts: Python, Linux, Networking, AWS, IoT, Cybersecurity |
| 3 | Connect GitHub | SkillGraph finds: AWS, Python, Docker, REST APIs, IoT |
| 4 | View skill graph | Strong: Python, Linux. Moderate: AWS, Docker. Weak: IAM, Terraform, SIEM |
| 5 | View market intelligence | IAM: HIGH, Terraform: HIGH, SIEM: MED/HIGH, AWS: VERY HIGH |
| 6 | Ask "Why am I not ready?" | Agent answers using graph + market data (no hallucination) |
| 7 | Click "Build my 30-day plan" | Week 1: IAM, Week 2: Monitoring, Week 3: Terraform, Week 4: Build project |
| 8 | Change to 5 hrs/week | Plan recalculates (this is the wow moment) |

---

## ⚠️ Anti-Hallucination Checklist

Before every agent coding session, verify:

- [ ] The agent has read `docs/product-spec.md`
- [ ] The agent has read `docs/architecture.md`
- [ ] The agent has read `docs/agent-rules.md`
- [ ] The current task ID is written at the top of the agent's response (e.g., "Working on task 5.3")
- [ ] The agent is not adding features not listed in the Must Have list
- [ ] The agent is not changing DynamoDB schema without explicit authorization
- [ ] The agent is not calling AWS services not listed in the Architecture Summary table
- [ ] The Bedrock agent system prompt includes: "Only answer using data returned by your tools. Do not invent skills, evidence, or market data."
- [ ] After implementation, the agent has run the acceptance check for the current task
