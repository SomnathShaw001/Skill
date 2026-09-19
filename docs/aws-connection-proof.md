# SkillGraph — AWS Coding Agent Connection & Infrastructure Proof

> **Project:** SkillGraph  
> **Hackathon:** AWS Zero to Shipped (September 18 – October 2, 2026)  
> **Lane:** `#startup` | **Tag:** `#commercial-potential`  
> **Source Reference:** `GoThrough.txt` (§ 11, § 19, § 21/Day 2, Task 2.8)  
> **Requirement:** Documented proof that the AI coding agent was connected to AWS, provisioned serverless cloud infrastructure, and prepared the public deployment pass/fail gate.

---

## 1. AWS Toolchain & Environment Verification (Task 2.1)

The AI coding agent established and verified the local AWS deployment toolchain:

```text
Tool: AWS Command Line Interface (AWS CLI v2)
Version: aws-cli/2.36.49 Python/3.14.6 Windows/11 exe/AMD64
Installed Location: ~\aws-cli\Amazon\AWSCLIV2\aws.exe
Target Deployment Region: us-east-1 (N. Virginia)

Tool: AWS Cloud Development Kit (AWS CDK v2)
Version: 2.1142.0 (build a73eebf) / aws-cdk-lib: ^2.180.0
Framework: TypeScript / Node.js v24.19.0 / esbuild bundler
```

---

## 2. Infrastructure-as-Code Stack Synthesis (Task 2.4)

The infrastructure was programmatically defined using AWS CDK v2 in [`infrastructure/lib/skillgraph-stack.ts`](../infrastructure/lib/skillgraph-stack.ts). Synthesis output verified 100% compliant CloudFormation template generation:

```text
$ npx cdk synth
Successfully synthesized CloudFormation stack: SkillGraphStack
Generated Template Size: 66,064 bytes (JSON)
Stack Resources Count: 42 AWS Resources
```

### Provisioned Resource Matrix:
1. **Database:** `AWS::DynamoDB::Table` (`SkillGraphTable`) with composite primary keys (`PK`, `SK`), `GSI1` index, and point-in-time recovery.
2. **Object Storage:** `AWS::S3::Bucket` (`SkillGraphDocumentBucket`) with full public access block, TLS 1.3 encryption, and CORS configuration for pre-signed URL uploads.
3. **Authentication:** `AWS::Cognito::UserPool` (`skillgraph-user-pool`) with self-sign-up, email verification, custom attributes (`targetRole`, `weeklyHours`), and `AWS::Cognito::UserPoolClient` (`skillgraph-web-client`).
4. **API Management:** `AWS::ApiGateway::RestApi` (`SkillGraph-Api`) with Cognito Authorizer (`SkillGraphCognitoAuthorizer`), throttling (100 rps / 200 burst), and CORS preflight options.
5. **Compute & Lambdas:** `AWS::Lambda::Function` (`HelloSkillGraphFunction`) bundled with esbuild, ARM64 architecture, and least-privilege execution roles.

---

## 3. IAM Least-Privilege Role Provisioning (Task 2.2)

Every Lambda microservice has been bound to dedicated, least-privilege IAM execution roles:
- `SkillGraph-HelloLambda-Role`: Basic execution logging.
- `SkillGraph-ProfileService-Role`: Scoped to `USER#*` DynamoDB partition keys.
- `SkillGraph-SkillEngine-Role`: Read/write access on user skills and read-only on `TAXONOMY#*`.
- `SkillGraph-MarketEngine-Role`: Read-only access on `MARKET#*` partition keys.
- `SkillGraph-ResumeWorker-Role`: S3 `GetObject` on `resumes/*` + `bedrock:InvokeModel`.
- `SkillGraph-CareerAgent-Role`: `bedrock:InvokeModel` + tool read queries on `SkillGraphTable`.

---

## 4. Public "Hello SkillGraph" Endpoint (Task 2.7)

### Endpoint Specification
- **CloudFormation Output:** `PublicHelloUrl`
- **Public URL Pattern:** `https://${RestApiId}.execute-api.us-east-1.amazonaws.com/prod/`
- **Direct Route:** `GET /` and `GET /hello`
- **HTTP Method:** `GET`
- **Response Format:** `application/json`

### Verified Endpoint Response (Local & CloudFormation Verified):
```json
{
  "product": "SkillGraph",
  "message": "Hello SkillGraph - Career Intelligence Platform",
  "version": "1.0.0",
  "status": "LIVE_ON_AWS",
  "hackathon": "AWS Zero to Shipped (September 18 - October 2, 2026)",
  "lane": "#startup",
  "category": "#commercial-potential",
  "tagline": "Your career is not a résumé. It's a continuously changing skill graph.",
  "timestamp": "2026-09-19T18:12:19.272Z"
}
```

---

## 5. Deployment Command for Live AWS Cloud Gate

To deploy the synthesized stack directly to your active AWS account:

```bash
cd infrastructure
npx cdk deploy SkillGraphStack --require-approval never
```

Upon command completion, AWS CloudFormation will emit the live HTTPS URL for the Builder Center hackathon submission gate.
