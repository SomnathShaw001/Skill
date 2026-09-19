# SkillGraph — Coding Agent Operating Rules & Behavioral Invariants

> **Document Version:** 1.0.0  
> **Source Reference:** `GoThrough.txt` (§ 6, § 11, § 15, § 19, § 22)  
> **Mandatory Pre-Flight Instruction:** Every AI coding agent session working on SkillGraph must load and obey this document unconditionally.

---

## 1. The Canonical Agent System Instruction (GoThrough.txt § 22)

Every coding agent session starts with this foundational directive:

> **"You are working on SkillGraph. Do not invent requirements. Read `/docs/product-spec.md`, `/docs/architecture.md`, and `/docs/agent-rules.md` before modifying the codebase. Implement only the requested task. Do not change architecture, dependencies, database schema, authentication, or AWS resources unless explicitly authorized. After implementation, run the specified tests and report exactly what changed."**

---

## 2. The 10 Inviolable Operating Invariants

1. **Zero Requirement Invention:** Every feature, function, or API endpoint implemented must trace directly to a verified section of `GoThrough.txt` and an authorized task ID in `TASK_BOOKMARK.md`.
2. **Pre-Flight Identification:** Before editing any file, declare:
   - The active task ID (e.g., `Task 3.2`).
   - The exact target file path(s).
   - The specific goal and expected acceptance criteria.
3. **Minimal Surgical Edits:** Implement the smallest functional change necessary to satisfy the current task. Do not refactor unrelated modules or rewrite working code.
4. **Immediate Narrow Validation:** Run the narrowest practical validation immediately following each edit (e.g., unit test, type-check, schema validation, linting) before declaring completion.
5. **Exact Transparent Reporting:** At the end of every turn, output:
   - What file(s) changed.
   - What validation was executed and the result.
   - Any blockers, assumptions, or required user authorizations.
6. **Architecture & Schema Lock:** You are strictly forbidden from adding third-party dependencies, modifying DynamoDB partition/sort key structures, altering Cognito auth flows, or introducing new AWS services without explicit user command.
7. **Sequential Phase Discipline:** Never skip ahead to future phases (e.g., writing Bedrock agent code during Day 3 UI scaffolding). Work strictly within the current checkpoint.
8. **Living Documentation Maintenance:** Every AWS interaction, deployment URL, and agent modification must be logged in `docs/agent-log.md` and `docs/aws-connection-proof.md`.
9. **One Vertical Slice at a Time:** Build, test, verify, and document one self-contained slice before moving to the next.
10. **Session Grounding:** At the start of every new conversation or prompt, re-verify the active task ID against `TASK_BOOKMARK.md`.

---

## 3. The Development Loop (GoThrough.txt § 19)

All code modifications must follow this rigorous state progression:

```text
       ┌───────────────┐
       │  REQUIREMENT  │ (Task from TASK_BOOKMARK.md)
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │  AGENT PLAN   │ (Identify target files & acceptance test)
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │IMPLEMENTATION │ (Smallest surgical code modification)
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │     TEST      │ (Run validation / unit tests)
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │ HUMAN REVIEW  │ (Report diff, test output, wait for user "yes")
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │    COMMIT     │ (Git commit with clean conventional message)
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │    DEPLOY     │ (Push to AWS staging/prod environment)
       └───────────────┘
```

---

## 4. Prohibited vs. Permitted Actions Matrix

| Category | 🚫 Prohibited Actions | ✅ Permitted Actions |
|---|---|---|
| **Scope** | Adding mobile views, LMS modules, social feeds, job application bots, or payment gateways (GoThrough § 15). | Implementing individual career dashboard, graph visualization, evidence calculation, and 30-day sprint generation. |
| **Data Ingestion** | Scraping arbitrary job websites or unlicensed sources recklessly (GoThrough § 6). | Ingesting curated, legally compliant job datasets documented in `docs/architecture.md`. |
| **AWS Cloud** | Spinning up unapproved services (e.g., RDS, OpenSearch, ECS, SageMaker) just to inflate diagrams (GoThrough § 11). | Using approved serverless stack: Cognito, API Gateway, Lambda, DynamoDB, S3, Bedrock, EventBridge, SQS, CloudWatch. |
| **Database** | Changing `PK` / `SK` schema conventions or adding multi-table sprawl. | Writing queries adhering strictly to access patterns AP-01 through AP-09 in `docs/database-design.md`. |
| **AI / Bedrock** | Allowing the model to invent skills, hallucinate repos, or fabricate market numbers without tools (GoThrough § 10). | Enforcing tool-grounding: Bedrock answers queries strictly using outputs from `get_skill_graph`, `get_market_data`, and `get_gap_analysis`. |

---

## 5. Session Execution Checklist (Run Before Any Code Edit)

Before executing any terminal command or writing code:
- [ ] Have I identified the authorized Task ID from `TASK_BOOKMARK.md`?
- [ ] Have I verified that this task does not violate the Day/Phase sequence?
- [ ] Is this change the minimal necessary code to pass the task's acceptance check?
- [ ] Does this edit introduce unapproved dependencies into `package.json` or `requirements.txt`?
- [ ] Will I report exact diffs and test results upon completion?
