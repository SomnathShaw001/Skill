# SkillGraph — AWS System Architecture Specification

> **Document Version:** 1.0.0  
> **Source Reference:** `GoThrough.txt` (§ 11, § 12, § 20)  
> **Rule:** Every AWS service must have a concrete functional role. No unused or vanity services.

---

## 1. Architectural Philosophy & "Why AWS Matters" (GoThrough.txt § 12)

SkillGraph is an event-driven, continuously updating career intelligence system. As candidates write code, update repositories, earn credentials, and as the tech job market shifts, the underlying career graph must adapt dynamically.

> **"SkillGraph continuously processes changing market data, user evidence, documents, and AI workflows. AWS gives us the event-driven infrastructure, secure identity, durable storage, asynchronous processing, observability, and AI foundation required to keep a user's career graph continuously updated."** (GoThrough.txt § 12)

---

## 2. High-Level Architecture Diagram (GoThrough.txt § 11)

```text
                                 [ USER / CLIENT ]
                                         │
                                         ▼
                            [ Next.js Web Application ]
                                (Hosted on AWS Amplify
                                   or CloudFront + S3)
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
          [ AWS Cognito ]                             [ Amazon S3 ]
      (User Pools & Auth Tokens)                 (Encrypted Resume / Doc Upload)
                   │                                           │
                   ▼                                           │ S3 ObjectCreated
          [ Amazon API Gateway ]                               │ Event
        (REST API / JWT Authorizer)                            │
                   │                                           ▼
       ┌───────────┼───────────┬───────────┐         [ Amazon EventBridge ]
       ▼           ▼           ▼           ▼                   │
  [ Profile ]  [ Skill ]   [ Market ]   [ Gap/Agent ]          ▼
  [ Lambda  ]  [ Engine]   [ Engine ]   [  Lambda   ]    [ Amazon SQS ]
       │           │           │           │         (Resume & Ingestion Queue)
       └───────────┼───────────┴───────────┘                   │
                   ▼                                           ▼
          [ Amazon DynamoDB ]                          [ Worker Lambda ]
       (Single-Table / Graph Store)                            │
                   │                                           ▼
                   │                                  [ Amazon Bedrock ]
                   │                             (Claude / Titan Foundation Models)
                   │                                           │
                   └───────────────────────────────────────────┘
                                   │
                                   ▼
                         [ Amazon CloudWatch ]
                      (Logs, Metrics, Alarms)
```

---

## 3. Component Inventory & Service Roles

| AWS Service | Functional Role in SkillGraph | Rationale & Trade-offs |
|---|---|---|
| **Next.js Web Application** | User Interface, Interactive Graph, Dashboards, Chat Interface | Server-side rendering (SSR) + static asset performance, unified React component model. |
| **AWS Cognito** | Authentication & Authorization | Manages user sign-up, sign-in, MFA, and issues JWT tokens verified by API Gateway. |
| **Amazon API Gateway** | API Management & Security | Exposes HTTPS REST endpoints, enforces Cognito JWT validation, handles rate limiting and throttling. |
| **AWS Lambda** | Serverless Microservices Compute | Runs business logic on-demand without server overhead: Profile Management, Skill Calculations, Agent Orchestration. |
| **Amazon DynamoDB** | Operational Database & Graph Store | Sub-millisecond latency, serverless scaling, structured key-value and adjacency-list models for user skills, evidence, and market data. |
| **Amazon S3** | Durable Object Storage | Secure pre-signed URL upload bucket for PDF/DOCX resumes and portfolio evidence artifacts; server-side encryption enabled (SSE-S3/KMS). |
| **Amazon Bedrock** | Generative AI & Foundation Models | Secure, managed model invocation for: (1) resume skill extraction, (2) repository signal reasoning, (3) grounded career planning, and (4) Career Agent tool use. |
| **Amazon EventBridge** | Event Routing & Decoupling | Routes asynchronous events (e.g., S3 upload completed, GitHub sync requested, job dataset updated) to processing pipelines. |
| **Amazon SQS** | Asynchronous Work Buffering | Decouples long-running Bedrock analysis jobs (resume parsing, batch repo scanning) from synchronous API latency; provides dead-letter queuing (DLQ). |
| **Amazon CloudWatch** | Centralized Observability | Aggregates application logs from all Lambdas, tracks invocation metrics, API latencies, Bedrock token consumption, and triggers error alerts. |

---

## 4. End-to-End Operational Flows

### 4.1 Synchronous User Interactive Flow
```text
User Action (Browser)
   │
   ├──> Authenticates via AWS Cognito User Pool (returns ID & Access JWT)
   │
   └──> Sends Request with Bearer Token to Amazon API Gateway
           │
           ├── Validates JWT signature & expiration
           │
           └── Dispatches to targeted AWS Lambda:
                 • GET /profile       -> Profile Lambda
                 • GET /skills/graph  -> Skill Engine Lambda
                 • GET /market/radar  -> Market Engine Lambda
                 • POST /agent/chat   -> Bedrock Career Agent Lambda
                       │
                       └── Reads / Writes directly to Amazon DynamoDB
```

### 4.2 Asynchronous Resume Ingestion Pipeline
```text
1. Client requests pre-signed upload URL from API Gateway -> Lambda.
2. Client uploads PDF directly to Amazon S3 (s3://skillgraph-resumes/{userId}/{fileId}.pdf).
3. S3 triggers `ObjectCreated` event -> Amazon EventBridge.
4. EventBridge pushes task onto SQS FIFO Queue (`resume-processing-queue`).
5. Worker Lambda consumes SQS message:
   a. Fetches document from S3.
   b. Extracts raw text.
   c. Calls Amazon Bedrock (`anthropic.claude-3` / Bedrock equivalent) with normalized taxonomy prompt.
   d. Parses structured JSON response (skills, proficiency, years, context).
   e. Updates User Skills & Evidence records in Amazon DynamoDB.
   f. Emits CloudWatch metric `ResumeProcessedSuccess`.
```

### 4.3 Asynchronous GitHub Repository Analysis Pipeline
```text
1. User authorizes GitHub OAuth and triggers "Sync Repositories".
2. API Gateway places task on SQS (`github-ingestion-queue`).
3. GitHub Worker Lambda:
   a. Queries GitHub REST API for authorized user repos.
   b. Scans dependency trees, manifests, Dockerfiles, and test setups.
   c. Assembles signal vector (languages, AWS SDK usage, IaC, CI/CD, testing).
   d. Corroborates self-reported skills against code evidence.
   e. Writes evidence provenance (`source = github:{repo}`) into Amazon DynamoDB.
```

### 4.4 Bedrock Career Agent & Tool Grounding Flow
```text
User Question: "Why am I not ready for Cloud Security Engineer?"
   │
   ▼
Agent Lambda (Bedrock Converse / Agent API)
   │
   ├── Step 1: Agent determines needed context and executes local tool calls:
   │     • Tool 1: get_skill_graph(userId) -> Queries DynamoDB
   │     • Tool 2: get_market_data("Cloud Security Engineer") -> Queries DynamoDB
   │     • Tool 3: calculate_gap(userId, "Cloud Security Engineer")
   │
   ├── Step 2: Agent synthesizes output strictly based on returned tool payloads.
   │
   └── Step 3: Returns verified, hallucination-free response with citations.
```

---

## 5. Security & Isolation Architecture (GoThrough.txt § 11, § 21/Day 11)

- **Network & Perimeter:** CloudFront CDN with TLS 1.3, API Gateway throttling limits to protect against DDoS.
- **Tenant Isolation:** Every DynamoDB partition key enforces strict `USER#{userId}` scoping. Cross-tenant access is strictly blocked at the IAM and application query layers.
- **Least Privilege IAM:**
  - Each Lambda execution role contains only the policies needed for its specific resources (e.g., Resume Worker can only `s3:GetObject` on the resumes prefix and `bedrock:InvokeModel`).
- **Data Protection:**
  - In-Transit: Strict HTTPS enforced across all endpoints.
  - At-Rest: DynamoDB and S3 encrypted with AWS KMS customer-managed or AWS-managed keys.

---

## 6. Acceptance Criteria for Architecture
- [x] Includes complete architecture diagram mapping clients, identity, routing, compute, storage, async messaging, and AI.
- [x] Explains concrete role and rationale for every AWS service.
- [x] Defines synchronous API and asynchronous batch pipelines (Resume & GitHub).
- [x] Matches GoThrough.txt § 11 & § 12 specifications.
