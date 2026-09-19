# 🚀 SkillGraph

> **Your career is not a résumé. It's a continuously changing skill graph.**

[![AWS Zero to Shipped](https://img.shields.io/badge/AWS%20Hackathon-Zero%20to%20Shipped-orange?logo=amazon-aws)](https://builder.aws.com)
[![Lane](https://img.shields.io/badge/Lane-%23startup-blue)](#)
[![Tag](https://img.shields.io/badge/Category-%23commercial--potential-green)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 💡 What is SkillGraph?

SkillGraph is an AI-powered career intelligence platform built during the **AWS Zero to Shipped Hackathon (September 18 – October 2, 2026)**.

It answers one foundational question:

> **"Given what I can actually prove today and what the market is asking for, what should I do next?"**

SkillGraph measures what you can **demonstrate**, not merely what you **claim**, compares demonstrable evidence against live market demand, identifies critical leverage skills, and generates a personalized 30-day "Learn → Build → Prove" execution sprint.

---

## ⚡ The Core Loop

```text
Understand Me → Understand Market → Find Gap → Tell Me What to Do → Prove I Improved
```

1. **Understand Me:** S3 resume upload + Bedrock extraction + GitHub multi-repo evidence analysis.
2. **Understand Market:** Curated job market demand data & trend velocity.
3. **Find Gap:** Algorithmic gap detection with dependency leverage weighting (e.g., how Terraform unlocks downstream cloud security capabilities).
4. **Tell Me What to Do:** 30-Day "Learn → Build → Prove" sprints dynamically budgeted by your weekly hours.
5. **Prove I Improved:** Code commits and portfolio projects update the graph in real time.

---

## 🏗️ Architecture & AWS Services

SkillGraph is built on a serverless AWS infrastructure:

- **Frontend:** Next.js (App Router) + Modern Dark Design System
- **Authentication:** AWS Cognito (User Pools & JWT Verification)
- **API Management:** Amazon API Gateway (REST API with Cognito Authorizer)
- **Compute:** AWS Lambda (Node.js & Python Microservices)
- **Database:** Amazon DynamoDB (Single-Table Design: `SkillGraphTable`)
- **Storage:** Amazon S3 (Encrypted Document & Resume Ingestion)
- **AI & Reasoning:** Amazon Bedrock (Foundation Models & Tool-Calling Career Agent)
- **Decoupled Pipelines:** Amazon EventBridge + Amazon SQS
- **Observability:** Amazon CloudWatch (Logs, Metrics, Alarms)

---

## 📂 Repository Structure (GoThrough.txt § 20)

```text
skillgraph/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI component library
├── lib/              # Core utilities, formulas & types
├── services/         # Client-side API integration services
├── agents/           # Bedrock Career Agent schemas & tool handlers
├── database/         # DynamoDB schemas, seed data & migrations
├── infrastructure/   # AWS Cloud Development Kit (CDK) IaC
├── tests/            # Unit, integration & security test suites
├── scripts/          # Deployment and automation utilities
└── docs/             # Authoritative design & architecture specifications
```

---

## 🚦 Getting Started Locally

### Prerequisites
- Node.js `v20+` or `v24+`
- AWS CLI v2 (`aws --version`)
- AWS CDK v2 (`npx aws-cdk --version`)

### Quickstart
1. **Clone the repository:**
   ```bash
   git clone https://github.com/somnath/skillgraph.git
   cd skillgraph
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Synthesize AWS Infrastructure:**
   ```bash
   cd infrastructure && npx cdk synth
   ```

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
