# SkillGraph — Production Deployment & Operational Runbook (Day 12)

> **Document:** `docs/deployment.md`  
> **Status:** FEATURE FREEZE ENFORCED • PRODUCTION READY  
> **Reference:** `GoThrough.txt` § 11, § 12, § 20, § 21 (Day 12 Tasks 12.1 – 12.7)

---

## 1. Feature Freeze Declaration (Task 12.1)

As mandated by GoThrough.txt § 21 Day 12, all functional development is officially **FROZEN**. No new features, routes, or unapproved dependencies may be added. All engineering focus is dedicated to production hardening, observability, demo reproducibility, and submission evidence.

---

## 2. Production AWS Environment Topology (Task 12.2 & 12.3)

| Component | Resource Identifier | Configuration & Security Attributes |
|---|---|---|
| **Identity** | `CognitoUserPool: skillgraph-user-pool` | 10-char password policy, self-signup, custom attributes (`targetRole`, `weeklyHours`) |
| **API Gateway** | `RestApi: SkillGraph-Api` | Regional HTTPS endpoint, Cognito Authorizer, 100 req/sec throttling, CORS whitelisting |
| **Compute** | AWS Lambda (Node.js 20 ARM64) | Single-purpose execution roles, least-privilege IAM, 30-sec execution timeout |
| **Database** | `DynamoDB: SkillGraphTable` | On-Demand capacity, point-in-time recovery, composite key partition isolation |
| **Storage** | `S3: skillgraph-document-bucket-live` | AES-256 server-side encryption, public access blocked, CORS pre-signed PUT |
| **AI / Reasoning**| `Amazon Bedrock` | `anthropic.claude-3-haiku` / Converse API with tool grounding |
| **Observability** | `CloudWatch Logs & Alarms` | Retention 30 days, latency metrics, error-rate alarms |

**Public HTTPS Deployment URL:**
```text
https://9e2m5vkwk1.execute-api.us-east-1.amazonaws.com/prod/
```

---

## 3. Pre-Configured Demo Account (Task 12.4)

To ensure seamless evaluation by hackathon judges, a pre-loaded demonstration account is available:

- **Email:** `somnath.dev@skillgraph.internal`
- **User ID:** `user_demo_somnath`
- **Pre-Loaded Artifacts:**
  - S3 Resume: `resume_somnath_security_2026.pdf` (6 Bedrock-extracted capabilities: Python, Linux, Networking, AWS, IoT, Cybersecurity)
  - GitHub Repositories: `somnath/iot-security-platform` (8 signals: Python, Boto3, Docker, REST APIs, pytest 84%, CI/CD Actions)
  - Target Role: `Cloud Security Engineer`
  - Baseline Readiness: `68%`

---

## 4. Clean Browser Incognito Verification (Task 12.5)

The application has been verified in an isolated incognito browser session with zero cached localStorage:
1. Navigated to landing page `/`
2. Verified value proposition, architecture summary, and interactive ASCII command center
3. Clicked "Sign In" $\rightarrow$ authenticated demo user
4. Navigated across all 7 views: `/dashboard`, `/profile`, `/graph`, `/evidence`, `/market`, `/gap`, `/roadmap`
5. Verified 100% responsive rendering with zero visual glitches or console errors

---

## 5. Amazon CloudWatch Monitoring & Alarms (Task 12.6)

A dedicated CloudWatch dashboard (`SkillGraph-Production-Monitoring`) tracks:
- **API Gateway 4XX / 5XX Errors:** Alert threshold $> 0$ errors over 5 minutes
- **Lambda P95 Latency:** Baseline $< 450$ ms for synchronous queries
- **Bedrock Tool Invocations:** Metric `BedrockToolCallsSuccess` tracking tool grounding fidelity
- **DynamoDB ThrottledRequests:** Baseline 0 on on-demand capacity

---

## 6. Local Build & Run Instructions

To run the production build locally:

```bash
# 1. Install dependencies
npm install

# 2. Build optimized Next.js static production bundle
npm run build

# 3. Start production server
npm start
```
Server launches on `http://localhost:3000`.
