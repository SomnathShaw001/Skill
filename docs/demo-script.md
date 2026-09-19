# SkillGraph — Official Demo Scripts & Presentation Guide (Day 13)

> **Document:** `docs/demo-script.md`  
> **Hackathon:** AWS Zero to Shipped (Sept 18 – Oct 2, 2026)  
> **Category / Lane:** `#commercial-potential` / `#startup`  
> **Reference:** `GoThrough.txt` § 1, § 17, § 18, § 21 (Day 13 Tasks 13.1 – 13.2)

---

## 1. The 90-Second Hackathon Demo Script (Task 13.1)

Follows the exact 8-step live walkthrough codified in **GoThrough.txt § 17**:

| Time | Step | Screen / Action | Exact Spoken Narrative | What Screen Displays |
|---|---|---|---|---|
| **0:00 - 0:10** | **Intro** | Landing Page (`/`) | *"Your career is not a résumé. It's a continuously changing skill graph. SkillGraph measures what you can prove today and tells you the exact shortest path to your target role."* | Clean obsidian hero headline and live ASCII teaser. |
| **0:10 - 0:20** | **Step 1 & 2** | Evidence Hub (`/evidence`) | *"I set my target to Cloud Security Engineer. I upload my resume directly to Amazon S3. Bedrock instantly extracts my verified background: Python, Linux, Networking, AWS, and IoT."* | S3 pre-signed upload card with Bedrock citation tags. |
| **0:20 - 0:35** | **Step 3 & 4** | Skill Graph (`/graph`) | *"Next, I connect GitHub. SkillGraph inspects my repositories across 8 signal dimensions—code, tests, IaC, and CI/CD. My Skill Graph renders: Strong Python and Linux, moderate AWS, but weak IAM and Terraform."* | Interactive SVG DAG visualizer with colored confidence nodes. |
| **0:35 - 0:48** | **Step 5** | Market Radar (`/market`) | *"Now we bring in the market. Looking at curated demand data: AWS and IAM are in critical 80%+ demand, but Terraform is surging with explosive growth (+26%)."* | Market Radar table with demand bars and `↑↑` trend badges. |
| **0:48 - 1:05** | **Step 6** | Dashboard (`/dashboard`) | *"I ask the Bedrock Career Agent: 'Why am I not ready?' It doesn't give generic advice. It cites my actual GitHub evidence and explains that while I have strong Python, Terraform is my #1 systemic bottleneck with a 3.2x leverage multiplier."* | Bedrock chat drawer shows tool calls `get_skill_graph`, `get_market_data`, and evidence citations. |
| **1:05 - 1:20** | **Step 7** | Roadmap (`/roadmap`) | *"I click 'Build my 30-day plan'. SkillGraph constructs a 4-week Learn $\rightarrow$ Build $\rightarrow$ Prove sprint: Week 1 IAM, Week 2 Monitoring, Week 3 Terraform, Week 4 Live Cloud Deployment."* | 4-week milestone cards with deliverables and expected readiness boost (+14%). |
| **1:20 - 1:30** | **Step 8 (Wow Moment)** | Roadmap Slider (`/roadmap`) | *"What if I only have 5 hours a week? I move the slider to 5 hours. Watch: the roadmap dynamically recalibrates its pacing to fit my exact budget."* | Deliverables and pacing compress to 5 hrs/wk constrained execution. |
| **1:30** | **Outro** | Footer / Live Proof | *"SkillGraph: Don't guess your next career move. Measure it. Live on AWS."* | Live HTTPS URL displayed. |

---

## 2. The 3-Minute Extended Pitch Script (Task 13.2)

### Act I: The Problem (0:00 - 0:45)
- Every year, millions of developers spend thousands of hours taking disconnected courses and rewriting résumés.
- Traditional job boards tell you what jobs exist. Résumé scanners tell you what keywords you missed. Courses sell you hours of video.
- **None of them answer the only question that matters:** *"Given what I can actually prove today and what the market is asking for, what should I do next?"*

### Act II: The Solution & Technical Architecture (0:45 - 2:00)
- **Multi-Source Evidence Model:** SkillGraph measures what you can *demonstrate*, not merely what you *claim*.
- **AWS-Native Serverless Engine:**
  - Amazon S3 + Bedrock Claude 3 extracts grounded skill tokens from resumes.
  - Read-only GitHub OAuth analyzes 8 signal dimensions (code, frameworks, SDKs, APIs, databases, IaC, pytest, CI/CD).
  - DynamoDB Single-Table schema models the candidate's DAG and market demand without expensive graph database overhead.
  - The Systemic Leverage Engine computes dependency bottlenecks (e.g., Terraform unlocking 3 downstream capabilities with a 3.2x multiplier).
- **Dynamic Constraint Adaptation:**
  - Real careers have time constraints. Moving from 15 hrs/wk to 5 hrs/wk dynamically re-schedules the roadmap.

### Act III: Commercial Potential & The Pitch (2:00 - 3:00)
- **The Startup Opportunity (`#startup`, `#commercial-potential`):**
  - B2C Freemium: $19/mo for career sprints and continuous GitHub evidence tracking.
  - B2B Enterprise / University: Lightweight talent readiness dashboards verifying candidate skill proof for engineering leaders and hiring teams.
- **Closing Tagline:**
  > *"LinkedIn tells you what jobs exist. Courses tell you what you can learn. Résumé scanners tell you what's missing. SkillGraph connects all three — and turns the gap into a plan you can actually execute."*
