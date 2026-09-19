/**
 * SkillGraph — GitHub Intelligence Service (Day 6 / Tasks 6.1, 6.2, 6.4)
 * Client service orchestrating read-only OAuth, repository signal inspection, and evidence mapping.
 * Reference: GoThrough.txt § 4, § 13, § 17 (Step 3), § 21 (Day 6).
 */

import { EvidenceItem } from '../lib/types';
import { normalizeSkill } from '../lib/skill-normalizer';

export interface GitHubRepository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  isPrivate: boolean;
  defaultBranch: string;
  starsCount: number;
  languages: Record<string, number>;
  signals: {
    languages: string[];
    frameworks: string[];
    cloudServices: string[];
    apis: string[];
    databases: string[];
    infrastructure: string[];
    testing: string[];
    cicd: string[];
  };
  evidenceStrength: number;
  lastSyncedAt: string;
}

export const AUTHORIZED_DEMO_REPOSITORIES: GitHubRepository[] = [
  {
    id: 'repo-001',
    name: 'iot-security-platform',
    fullName: 'somnath/iot-security-platform',
    description: 'Production IoT edge gateway with AWS telemetry, device authentication, and automated CVE scanning.',
    isPrivate: false,
    defaultBranch: 'main',
    starsCount: 42,
    languages: { Python: 68, Shell: 20, Dockerfile: 12 },
    signals: {
      languages: ['Python 3.11', 'Bash/Shell'],
      frameworks: ['FastAPI', 'Pydantic'],
      cloudServices: ['AWS Boto3', 'AWS IoT Core', 'Amazon DynamoDB', 'Amazon S3'],
      apis: ['REST API (24 endpoints)', 'OpenAPI / Swagger specs'],
      databases: ['Amazon DynamoDB', 'SQLite'],
      infrastructure: ['Dockerfile', 'docker-compose.yml'],
      testing: ['pytest (48 tests)', 'coverage: 84%'],
      cicd: ['GitHub Actions (.github/workflows/ci.yml)'],
    },
    evidenceStrength: 88,
    lastSyncedAt: '2026-09-18T14:30:00Z',
  },
  {
    id: 'repo-002',
    name: 'cloud-audit-agent',
    fullName: 'somnath/cloud-audit-agent',
    description: 'Serverless security scanner auditing AWS IAM policies against CIS Benchmarks.',
    isPrivate: false,
    defaultBranch: 'main',
    starsCount: 19,
    languages: { TypeScript: 74, Shell: 26 },
    signals: {
      languages: ['TypeScript', 'Node.js 20'],
      frameworks: ['AWS CDK v2'],
      cloudServices: ['AWS IAM', 'AWS Lambda', 'AWS CloudWatch', 'AWS Security Hub'],
      apis: ['AWS SDK v3 client commands'],
      databases: ['DynamoDB Single-Table'],
      infrastructure: ['AWS CDK TypeScript Constructs'],
      testing: ['Jest unit tests for CDK stacks'],
      cicd: ['GitHub Actions CDK synth & test'],
    },
    evidenceStrength: 76,
    lastSyncedAt: '2026-09-19T09:15:00Z',
  },
];

export interface GitHubAnalysisResult {
  connectedUser: string;
  scopes: string[];
  reposCount: number;
  repositories: GitHubRepository[];
  extractedEvidence: EvidenceItem[];
}

/**
 * Executes repository signal analysis and maps code artifacts to canonical SkillGraph evidence.
 */
export async function analyzeConnectedRepositories(
  selectedRepoNames?: string[]
): Promise<GitHubAnalysisResult> {
  const targetRepos = selectedRepoNames
    ? AUTHORIZED_DEMO_REPOSITORIES.filter((r) => selectedRepoNames.includes(r.fullName))
    : AUTHORIZED_DEMO_REPOSITORIES;

  const extractedEvidence: EvidenceItem[] = [];
  const dateStr = new Date().toISOString().split('T')[0];

  for (const repo of targetRepos) {
    // 1. Python signal
    if (repo.signals.languages.some((l) => l.toLowerCase().includes('python'))) {
      extractedEvidence.push({
        evidenceId: `ev_gh_${repo.id}_py`,
        skillId: 'python',
        skillName: 'Python',
        sourceType: 'GITHUB_REPO',
        sourceReference: repo.fullName,
        summary: `${repo.fullName}: Primary codebase in Python with ${repo.signals.testing[0]}`,
        weightContribution: 45,
        timestamp: dateStr,
      });
    }

    // 2. AWS Cloud signal
    if (repo.signals.cloudServices.length > 0) {
      extractedEvidence.push({
        evidenceId: `ev_gh_${repo.id}_aws`,
        skillId: 'aws',
        skillName: 'AWS Cloud Services',
        sourceType: 'GITHUB_REPO',
        sourceReference: repo.fullName,
        summary: `${repo.fullName}: Utilizes ${repo.signals.cloudServices.join(', ')}`,
        weightContribution: 40,
        timestamp: dateStr,
      });
    }

    // 3. Docker signal
    if (repo.signals.infrastructure.some((i) => i.toLowerCase().includes('docker'))) {
      extractedEvidence.push({
        evidenceId: `ev_gh_${repo.id}_docker`,
        skillId: 'docker',
        skillName: 'Docker & Containerization',
        sourceType: 'GITHUB_REPO',
        sourceReference: repo.fullName,
        summary: `${repo.fullName}: Containerized deployment via ${repo.signals.infrastructure.join(', ')}`,
        weightContribution: 40,
        timestamp: dateStr,
      });
    }

    // 4. REST APIs signal
    if (repo.signals.apis.length > 0) {
      extractedEvidence.push({
        evidenceId: `ev_gh_${repo.id}_api`,
        skillId: 'rest-apis',
        skillName: 'REST API Architecture',
        sourceType: 'GITHUB_REPO',
        sourceReference: repo.fullName,
        summary: `${repo.fullName}: Documented endpoints with ${repo.signals.apis.join(', ')}`,
        weightContribution: 35,
        timestamp: dateStr,
      });
    }

    // 5. IoT & Security signal
    if (repo.fullName.includes('iot')) {
      extractedEvidence.push({
        evidenceId: `ev_gh_${repo.id}_iot`,
        skillId: 'iot',
        skillName: 'IoT & Edge Security',
        sourceType: 'GITHUB_REPO',
        sourceReference: repo.fullName,
        summary: `${repo.fullName}: Edge gateway telemetry protocols and device authentication`,
        weightContribution: 35,
        timestamp: dateStr,
      });
    }
  }

  return {
    connectedUser: 'somnath-dev',
    scopes: ['read:user', 'repo (read-only)'],
    reposCount: targetRepos.length,
    repositories: targetRepos,
    extractedEvidence,
  };
}
