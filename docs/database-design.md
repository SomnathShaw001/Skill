# SkillGraph — DynamoDB Database Architecture & Data Model

> **Document Version:** 1.0.0  
> **Source Reference:** `GoThrough.txt` (§ 2, § 3, § 4, § 5, § 7, § 8, § 11, § 13)  
> **Storage Technology:** Amazon DynamoDB (Single-Table Design: `SkillGraphTable`)

---

## 1. Design Overview & Storage Strategy

To deliver single-digit millisecond latency, minimize AWS operational costs, and maintain clean tenant isolation, SkillGraph utilizes an **Amazon DynamoDB Single-Table Design**.

- **Primary Partition Key (`PK`):** String (Namespace/Tenant boundary, e.g., `USER#{userId}`, `MARKET#{roleId}`, `TAXONOMY#SKILLS`)
- **Primary Sort Key (`SK`):** String (Hierarchical entity identifier, e.g., `PROFILE`, `SKILL#{skillId}`, `EVIDENCE#{skillId}#{evidenceId}`)
- **Global Secondary Index 1 (`GSI1`):** Inverted query access pattern for cross-entity and category lookups
  - `GSI1PK` (Partition Key)
  - `GSI1SK` (Sort Key)

All timestamps are stored in ISO 8601 UTC string format (`YYYY-MM-DDTHH:mm:ss.sssZ`).

---

## 2. Entity Schemas & Key Design

### 2.1 User Profile Entity
Stores user metadata, current target role, time commitments, and top-level aggregated career readiness metrics.

- **PK:** `USER#{userId}`
- **SK:** `PROFILE`
- **Attributes:**
  ```json
  {
    "userId": "usr_94a2e8",
    "email": "candidate@example.com",
    "name": "Somnath",
    "targetRole": "Cloud Security Engineer",
    "weeklyHoursCommitment": 8,
    "careerReadiness": 68.5,
    "marketAlignment": 74.0,
    "evidenceStrength": 61.2,
    "skillCoverage": 72.0,
    "criticalGapsCount": 4,
    "verifiedSkillsCount": 7,
    "createdAt": "2026-09-19T10:00:00.000Z",
    "updatedAt": "2026-09-19T10:30:00.000Z",
    "GSI1PK": "ROLE#Cloud Security Engineer",
    "GSI1SK": "READINESS#068.5"
  }
  ```

---

### 2.2 User Skill Node Entity (GoThrough.txt § 2, § 3)
Represents a node in the user's personal career graph with self-reported level vs. verified evidence strength.

- **PK:** `USER#{userId}`
- **SK:** `SKILL#{skillId}`
- **Attributes:**
  ```json
  {
    "userId": "usr_94a2e8",
    "skillId": "skl_python",
    "name": "Python",
    "category": "Engineering",
    "selfReportedLevel": "Advanced",
    "evidenceStrength": 82.0,
    "confidenceScore": 88.0,
    "assessmentCategory": "Strong",
    "evidenceCount": 4,
    "verified": true,
    "updatedAt": "2026-09-19T10:30:00.000Z",
    "GSI1PK": "USER#{userId}#SKILLS",
    "GSI1SK": "CATEGORY#Engineering#skl_python"
  }
  ```

---

### 2.3 Skill Evidence Item Entity (GoThrough.txt § 3, § 4)
Stores discrete, immutable proof items extracted from resumes, authorized GitHub repositories, or credentials.

- **PK:** `USER#{userId}`
- **SK:** `EVIDENCE#{skillId}#{evidenceId}`
- **Attributes:**
  ```json
  {
    "userId": "usr_94a2e8",
    "skillId": "skl_python",
    "evidenceId": "evd_gh_repo_iot_sec",
    "sourceType": "GITHUB_REPO",
    "sourceReference": "github:somnath/iot-security-platform",
    "detectedSignals": {
      "languageShare": "68%",
      "hasTests": true,
      "hasFastAPI": true,
      "hasDocker": true,
      "commitCount": 142
    },
    "weightContribution": 35.0,
    "summary": "Full REST API with PyTest test suite and AWS DynamoDB integration.",
    "createdAt": "2026-09-19T10:25:00.000Z",
    "GSI1PK": "USER#{userId}#EVIDENCE",
    "GSI1SK": "SKILL#{skillId}#2026-09-19"
  }
  ```

---

### 2.4 Canonical Skill Taxonomy & Dependency Graph (GoThrough.txt § 2, § 7)
System-wide reference definitions establishing domain hierarchy and downstream skill leverage.

- **PK:** `TAXONOMY#SKILLS`
- **SK:** `SKILL#{skillId}`
- **Attributes:**
  ```json
  {
    "skillId": "skl_terraform",
    "name": "Terraform",
    "domain": "Infrastructure as Code",
    "prerequisites": ["skl_cloud_fundamentals", "skl_networking_basics"],
    "downstreamUnlocks": [
      "skl_aws_infra_automation",
      "skl_security_infra",
      "skl_cloud_sec_projects"
    ],
    "leverageFactor": 1.45,
    "description": "Declarative infrastructure orchestration tool by HashiCorp."
  }
  ```

---

### 2.5 Job Market Intelligence Entity (GoThrough.txt § 5, § 6)
Stores demand metrics, requirement frequency, and velocity trends calculated across job postings.

- **PK:** `MARKET#{targetRoleId}`
- **SK:** `SKILL#{skillId}`
- **Attributes:**
  ```json
  {
    "targetRoleId": "role_cloud_security_engineer",
    "targetRoleName": "Cloud Security Engineer",
    "skillId": "skl_aws_iam",
    "skillName": "AWS IAM",
    "demandScore": 82.0,
    "frequencyPercentage": 73.5,
    "trendDirection": "UP",
    "trendVelocity": "↑",
    "sampleCount": 450,
    "lastCalculatedAt": "2026-09-19T00:00:00.000Z",
    "GSI1PK": "MARKET#DEMAND",
    "GSI1SK": "ROLE#role_cloud_security_engineer#082.0"
  }
  ```

---

### 2.6 Career Gap Analysis Entity (GoThrough.txt § 7)
Precalculated differences between the candidate’s demonstrable evidence and the market demand benchmark for their target role.

- **PK:** `USER#{userId}`
- **SK:** `GAP#{targetRoleId}#{skillId}`
- **Attributes:**
  ```json
  {
    "userId": "usr_94a2e8",
    "targetRoleId": "role_cloud_security_engineer",
    "skillId": "skl_terraform",
    "skillName": "Terraform",
    "userEvidenceScore": 9.0,
    "marketDemandScore": 61.0,
    "rawGap": 52.0,
    "dependencyLeverageMultiplier": 1.45,
    "effectiveGapPriority": 75.4,
    "priorityRank": 2,
    "calculatedAt": "2026-09-19T10:35:00.000Z",
    "GSI1PK": "USER#{userId}#GAPS",
    "GSI1SK": "PRIORITY#002"
  }
  ```

---

### 2.7 Personalized Roadmap Sprint Entity (GoThrough.txt § 8, § 9)
Stores the generated 30-day "Learn → Build → Prove" execution plan grounded in gap prioritization.

- **PK:** `USER#{userId}`
- **SK:** `ROADMAP#{roadmapId}`
- **Attributes:**
  ```json
  {
    "userId": "usr_94a2e8",
    "roadmapId": "rdm_202609_30d",
    "targetRole": "Cloud Security Engineer",
    "allocatedHoursPerWeek": 8,
    "durationDays": 30,
    "status": "ACTIVE",
    "weeks": [
      {
        "weekNumber": 1,
        "phase": "LEARN",
        "focusSkill": "AWS IAM Fundamentals",
        "deliverables": ["Policy evaluation logic", "Least-privilege permission boundaries"]
      },
      {
        "weekNumber": 2,
        "phase": "BUILD",
        "focusSkill": "Least-Privilege AWS Architecture",
        "deliverables": ["IAM role delegation setup", "SCP configurations in test OU"]
      },
      {
        "weekNumber": 3,
        "phase": "BUILD",
        "focusSkill": "Terraform Security Automation",
        "deliverables": ["Modular Terraform templates", "tfsec linting in pipeline"]
      },
      {
        "weekNumber": 4,
        "phase": "PROVE",
        "focusSkill": "Deploy, Document & Test",
        "deliverables": ["Public GitHub repo", "Automated deployment tests", "Architecture README"]
      }
    ],
    "expectedEvidenceOutcomes": [
      "IAM Evidence (+45%)",
      "AWS Evidence (+20%)",
      "Terraform Evidence (+50%)",
      "Portfolio Project Artifact"
    ],
    "createdAt": "2026-09-19T10:40:00.000Z"
  }
  ```

---

## 3. Query Access Patterns & Index Mapping

| # | Access Pattern | Target Table / Index | Key Condition Expression |
|---|---|---|---|
| **AP-01** | Get user profile & readiness | Base Table | `PK = USER#{userId} AND SK = PROFILE` |
| **AP-02** | Get all skill nodes for a user | Base Table | `PK = USER#{userId} AND begins_with(SK, "SKILL#")` |
| **AP-03** | Get user skills filtered by category | GSI1 | `GSI1PK = USER#{userId}#SKILLS AND begins_with(GSI1SK, "CATEGORY#{category}")` |
| **AP-04** | Get all evidence items for a specific skill | Base Table | `PK = USER#{userId} AND begins_with(SK, "EVIDENCE#{skillId}#")` |
| **AP-05** | Get all market requirements for a target role | Base Table | `PK = MARKET#{targetRoleId} AND begins_with(SK, "SKILL#")` |
| **AP-06** | Get top market skills sorted by demand | GSI1 | `GSI1PK = MARKET#DEMAND AND begins_with(GSI1SK, "ROLE#{targetRoleId}#")` (ScanIndexForward: false) |
| **AP-07** | Get prioritized gaps for candidate | GSI1 | `GSI1PK = USER#{userId}#GAPS AND begins_with(GSI1SK, "PRIORITY#")` (ScanIndexForward: true) |
| **AP-08** | Get active sprint roadmap | Base Table | `PK = USER#{userId} AND begins_with(SK, "ROADMAP#")` |
| **AP-09** | Get canonical skill taxonomy & dependencies | Base Table | `PK = TAXONOMY#SKILLS AND SK = SKILL#{skillId}` |

---

## 4. Multi-Tenancy & Data Isolation (GoThrough.txt § 13)

- **Hard Boundary:** All user-owned data is strictly partitioned by `PK = USER#{userId}`.
- **Tenant Scope Enforcement:** No query can execute against user entities without supplying the authenticated `userId` extracted directly from the validated Cognito JWT claims in API Gateway/Lambda.
- **Shared Data Read-Only:** System-level data (`TAXONOMY#SKILLS` and `MARKET#{roleId}`) are read-only for individual users, writeable solely by trusted background batch worker Lambdas.

---

## 5. Acceptance Criteria for Database Design
- [x] Defines Single-Table partition and sort key structures for all MVP domain entities.
- [x] Implements the 9 critical access patterns required for dashboard, graph, evidence, gaps, and roadmap.
- [x] Includes explicit JSON representation of self-reported vs. evidence-verified attributes (§3).
- [x] Implements dependency leverage multipliers for gap prioritization (§7).
- [x] Fully references `GoThrough.txt` requirements with zero schema hallucination.
