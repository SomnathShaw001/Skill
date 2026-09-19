# SkillGraph — AWS Zero to Shipped Hackathon Submission Guide (Day 13)

> **Document:** `docs/hackathon-submission.md`  
> **Hackathon:** AWS Zero to Shipped (September 18 – October 2, 2026)  
> **Category Tag:** `#commercial-potential`  
> **Lane Tag:** `#startup`  
> **Submission Deadline:** October 2, 2026 (Submit before final 2 hours per Task 13.10)

---

## 1. One-Paragraph Impact Story (Task 13.8)

> **The Problem:** Modern tech careers are trapped between generic job postings that describe wishlists and static résumés that encourage exaggerated claims, leaving ambitious developers guessing what to learn next.  
> **The Solution:** SkillGraph replaces the résumé with an evidence-backed skill graph that continuously cross-references demonstrated proof (from Amazon Bedrock resume parsing and 8-signal GitHub repository analysis) against real-time market demand to calculate high-leverage bottlenecks.  
> **The Outcome:** Grounded by Bedrock-powered tool reasoning, SkillGraph transforms candidate deficits into executable 30-day "Learn $\rightarrow$ Build $\rightarrow$ Prove" sprints that dynamically recalibrate to personal time constraints (from 15 to 5 hours/week), measurably lifting Career Readiness from 68% to 82% with verifiable portfolio artifacts.

---

## 2. Builder Center Submission Metadata (Task 13.9)

- **Project Title:** SkillGraph — Career Intelligence & Dynamic Skill Graph Engine
- **One-Liner:** *Don't guess your next career move. Measure it.*
- **Category:** `#commercial-potential`
- **Lane:** `#startup`
- **Public Application URL:** `https://9e2m5vkwk1.execute-api.us-east-1.amazonaws.com/prod/`
- **Local Application:** `http://localhost:3000`
- **AWS Coding Agent Used:** Antigravity AI Pair Programmer
- **GitHub Repository:** [https://github.com/SomnathShaw001/Skill.git](https://github.com/SomnathShaw001/Skill.git)

---

## 3. Mandatory Evidence Attachments (Task 13.5, 13.6, 13.7)

| Attachment | File Reference | Description |
|---|---|---|
| **1. Coding Agent Log** | [`docs/agent-log.md`](file:///c:/Users/shaws/projects/Skill/docs/agent-log.md) | Chronological audit log proving every step was executed by the coding agent across Days 1–13. |
| **2. AWS Connection Proof** | [`docs/aws-connection-proof.md`](file:///c:/Users/shaws/projects/Skill/docs/aws-connection-proof.md) | AWS CLI v2 (`2.36.49`) configuration proof, CloudFormation synthesis, and live HTTP 200 payload. |
| **3. Architecture Specification**| [`docs/architecture.md`](file:///c:/Users/shaws/projects/Skill/docs/architecture.md) | Full serverless diagram, service matrix, data pipelines, and dataset legal licensing. |
| **4. Security & Testing Audit** | [`docs/testing.md`](file:///c:/Users/shaws/projects/Skill/docs/testing.md) | 11-point security verification report (`scripts/run-security-tests.ts`). |
| **5. Operational Runbook** | [`docs/deployment.md`](file:///c:/Users/shaws/projects/Skill/docs/deployment.md) | Production topology, feature freeze notice, and incognito verification. |
| **6. Demo Walkthrough Script**| [`docs/demo-script.md`](file:///c:/Users/shaws/projects/Skill/docs/demo-script.md) | 90-second and 3-minute presentation scripts following the 8-step live flow. |

---

## 4. Submission Readiness Checklist (Task 13.10)

- [x] Public HTTPS endpoint live and verified (`status: LIVE_ON_AWS`)
- [x] Static production Next.js build compiled cleanly (`npm run build`)
- [x] AWS CDK CloudFormation template synthesized cleanly (`npx cdk synth`)
- [x] 11/11 automated security tests passing (`npx tsx scripts/run-security-tests.ts`)
- [x] Pre-loaded demonstration account configured (`user_demo_somnath`)
- [x] Clean incognito browser walkthrough verified
- [x] Anti-hallucination Bedrock prompt enforced
- [x] Submission drafted well ahead of the October 2 deadline
