# 🚀 SkillGraph

> **Your career is not a résumé. It's a continuously changing skill graph.**

[![AWS Zero to Shipped](https://img.shields.io/badge/AWS%20Hackathon-Zero%20to%20Shipped-orange?logo=amazon-aws)](https://builder.aws.com)
[![Lane](https://img.shields.io/badge/Lane-%23startup-blue)](#)
[![Tag](https://img.shields.io/badge/Category-%23commercial--potential-green)](#)
[![Security Audit](https://img.shields.io/badge/Security%20Audit-11%2F11%20PASSED-emerald)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 💡 What is SkillGraph?

SkillGraph is an AI-powered career intelligence platform built for the **AWS Zero to Shipped Hackathon (September 18 – October 2, 2026)** in the `#startup` lane and `#commercial-potential` category.

It answers one foundational question:

> **"Given what I can actually prove today and what the market is asking for, what should I do next?"**

SkillGraph measures what you can **demonstrate**, not merely what you **claim**, compares demonstrable evidence against live market demand, identifies critical systemic leverage bottlenecks, and generates a personalized 30-day "Learn → Build → Prove" execution sprint that dynamically recalibrates to your weekly time constraints.

---

## 🌐 Live AWS Cloud Deployments

- 🚀 **Live Interactive Web Application (Amazon S3 Website Hosting):**  
  [**`http://skillgraph-app-430398381924.s3-website-us-east-1.amazonaws.com/`**](http://skillgraph-app-430398381924.s3-website-us-east-1.amazonaws.com/)  
  *(Full Next.js 15 interactive web application: Skill Graph DAG, Bedrock Career Agent Chat, Market Radar, and 30-Day Sprint Roadmap)*
- 🔒 **Live AWS Cloud REST API (Amazon API Gateway — HTTPS):**  
  [**`https://ilcjmegmml.execute-api.us-east-1.amazonaws.com/prod/`**](https://ilcjmegmml.execute-api.us-east-1.amazonaws.com/prod/)  
  *(Verified HTTPS cloud deployment endpoint with Cognito Authorizer, rate throttling, and CloudFormation health status)*
- 💻 **GitHub Repository:**  
  [`https://github.com/SomnathShaw001/Skill`](https://github.com/SomnathShaw001/Skill)
- ☁️ **AWS CloudFormation Stack:**  
  `SkillGraphStack` (Deployed to AWS Account `430398381924` in `us-east-1`, see [`docs/aws-connection-proof.md`](docs/aws-connection-proof.md))

---

## ⚡ The Core Loop

```text
Understand Me → Understand Market → Find Gap → Tell Me What to Do → Prove I Improved
```

1. **Understand Me:** S3 resume upload + Amazon Bedrock extraction + GitHub 8-signal repository analysis.
2. **Understand Market:** Curated job market demand data & trend velocity (CC BY 4.0 / O*NET).
3. **Find Gap:** Algorithmic gap detection with dependency leverage weighting (e.g., how Terraform unlocks 3 downstream capabilities with a 3.2x multiplier).
4. **Tell Me What to Do:** 30-Day "Learn → Build → Prove" sprints dynamically budgeted by your weekly hours (including the 5 hrs/week constraint recalculation).
5. **Prove I Improved:** Code commits and portfolio projects update the graph in real time, lifting Career Readiness from 68% to 82%.

---

## 🏗️ Architecture & AWS Services

SkillGraph is built on a serverless, decoupled AWS infrastructure:

- **Frontend & Web Hosting:** Next.js 15 (Static Export) hosted natively on **Amazon S3 Website Hosting** (`skillgraph-app-430398381924`)
- **API Management & HTTPS Gateway:** **Amazon API Gateway** (`SkillGraph-Api`) with Cognito Authorizer, rate throttling (100 req/sec, 200 burst), and HTTPS routing
- **Compute:** **AWS Lambda** (Node.js 20 ARM64 Microservices) with least-privilege IAM roles
- **AI & Reasoning:** **Amazon Bedrock** (`anthropic.claude-3-haiku` via Converse API) with strict tool schemas (`get_skill_graph`, `get_market_data`, `get_gap_analysis`)
- **Database:** **Amazon DynamoDB** (Single-Table Design: `SkillGraphTable`, `GSI1`)
- **Document Storage:** **Amazon S3** (`skillgraphstack-skillgraphdocumentbucket*`) with AES-256 encryption and pre-signed upload URLs
- **Authentication:** **AWS Cognito** User Pool & Web Client (`skillgraph-user-pool`)
- **Observability:** **Amazon CloudWatch** (Logs, Metrics, Alarms)

---

## 📂 Project Documentation Index

All development is strictly governed by the following authoritative documentation:

| Document | Purpose |
|---|---|
| [`docs/product-spec.md`](docs/product-spec.md) | Product specification, core loop, and scoring formulas |
| [`docs/architecture.md`](docs/architecture.md) | AWS infrastructure topology, data pipelines, and dataset licensing |
| [`docs/database-design.md`](docs/database-design.md) | DynamoDB Single-Table schema and composite access patterns |
| [`docs/security-model.md`](docs/security-model.md) | Least-privilege IAM matrix, tenant isolation, and prompt defenses |
| [`docs/agent-rules.md`](docs/agent-rules.md) | Coding agent operating invariants and 7-step loop |
| [`docs/agent-log.md`](docs/agent-log.md) | Chronological engineering log across Days 1–13 |
| [`docs/aws-connection-proof.md`](docs/aws-connection-proof.md) | AWS CLI v2 proof and live endpoint response |
| [`docs/testing.md`](docs/testing.md) | 11-point security & tenant isolation audit report |
| [`docs/deployment.md`](docs/deployment.md) | Production runbook, feature freeze notice, and incognito verification |
| [`docs/demo-script.md`](docs/demo-script.md) | 90-second and 3-minute hackathon presentation scripts |
| [`docs/hackathon-submission.md`](docs/hackathon-submission.md) | Official Builder Center submission metadata and impact story |

---

## 🚦 Getting Started Locally

### Prerequisites
- Node.js `v20+` or `v24+`
- AWS CLI v2 (`aws --version`)
- AWS CDK v2 (`npx aws-cdk --version`)

### Quickstart
1. **Clone the repository:**
   ```bash
   git clone https://github.com/SomnathShaw001/Skill.git
   cd Skill
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the 11-point Automated Security Test Suite:**
   ```bash
   npx tsx scripts/run-security-tests.ts
   ```
4. **Build & run the Next.js production web app:**
   ```bash
   npm run build
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Synthesize the AWS CDK Infrastructure:**
   ```bash
   cd infrastructure
   npx cdk synth
   ```

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
