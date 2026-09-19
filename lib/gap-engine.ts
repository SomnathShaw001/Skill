/**
 * SkillGraph — Career Gap & Systemic Leverage Engine (Day 8 / Tasks 8.1, 8.2, 8.3)
 * Calculates gap sizes, downstream dependency unlocks, and priority ranking.
 * Reference: GoThrough.txt § 7, § 21 (Day 8).
 */

import { getMarketProfileForRole } from './market-engine';
import { initialSkills } from './mock-data';

export interface CareerGapAnalysisItem {
  skillId: string;
  skillName: string;
  userScore: number;         // Current verified evidence %
  marketDemand: number;      // Market requirement %
  gapSize: number;           // max(0, marketDemand - userScore)
  surplus: number;           // max(0, userScore - marketDemand)
  status: 'CRITICAL_GAP' | 'MODERATE_GAP' | 'ALIGNED' | 'SURPLUS';
  dependencies: string[];    // Prerequisites
  downstreamUnlocks: string[]; // Skills unlocked when this is acquired
  leverageMultiplier: number; // Downstream impact weight (1.0x to 3.5x)
  priorityScore: number;     // gapSize * leverageMultiplier * (marketDemand / 100)
  priorityRank: number;      // Sorted ranking (1 = highest leverage bottleneck)
}

export interface DependencyChain {
  rootSkill: string;
  chain: string[];
  rationale: string;
}

// Canonical dependency leverage chains matching GoThrough § 7
export const SYSTEMIC_DEPENDENCY_CHAINS: DependencyChain[] = [
  {
    rootSkill: 'terraform',
    chain: ['Terraform (IaC)', 'AWS Infrastructure', 'Security Infrastructure', 'Cloud Security Projects'],
    rationale: 'Terraform is the foundational multiplier. Mastering IaC automates AWS provisioning and enables automated policy-as-code audits.',
  },
  {
    rootSkill: 'iam',
    chain: ['AWS IAM & Identity', 'Least-Privilege Architecture', 'Zero-Trust Controls', 'Cloud Security Projects'],
    rationale: 'IAM is the primary attack surface. Closing the IAM gap unlocks end-to-end security compliance and multi-account guardrails.',
  },
  {
    rootSkill: 'siem',
    chain: ['SIEM & Threat Monitoring', 'CloudWatch Logs / Splunk', 'Detection Engineering', 'SOC Operations'],
    rationale: 'Monitoring proves ongoing security vigilance. Unlocks detection engineering and incident response capabilities.',
  },
];

/**
 * Calculates comprehensive gap analysis for a target role.
 */
export function calculateCareerGaps(roleId: string = 'cloud-security-engineer'): CareerGapAnalysisItem[] {
  const market = getMarketProfileForRole(roleId);

  const rawGaps: Omit<CareerGapAnalysisItem, 'priorityRank'>[] = market.skills.map((mSkill) => {
    const userSkill = initialSkills.find((s) => s.skillId === mSkill.skillId);
    const userScore = userSkill ? userSkill.evidenceStrength : 0;
    const gapSize = Math.max(0, mSkill.demandScore - userScore);
    const surplus = Math.max(0, userScore - mSkill.demandScore);

    let status: CareerGapAnalysisItem['status'] = 'ALIGNED';
    if (gapSize > 35) {
      status = 'CRITICAL_GAP';
    } else if (gapSize > 10) {
      status = 'MODERATE_GAP';
    } else if (surplus > 5) {
      status = 'SURPLUS';
    }

    // Downstream unlocks and systemic leverage multipliers
    let downstreamUnlocks: string[] = [];
    let leverageMultiplier = 1.0;
    let dependencies: string[] = [];

    if (mSkill.skillId === 'terraform') {
      downstreamUnlocks = ['AWS Infrastructure', 'Security Infrastructure', 'Cloud Security Projects'];
      leverageMultiplier = 3.2;
      dependencies = ['AWS Cloud Services'];
    } else if (mSkill.skillId === 'iam') {
      downstreamUnlocks = ['Zero Trust Controls', 'Audit Compliance', 'Security Services'];
      leverageMultiplier = 2.8;
      dependencies = ['AWS Cloud Services'];
    } else if (mSkill.skillId === 'siem') {
      downstreamUnlocks = ['Detection Engineering', 'Incident Response', 'SOC Automation'];
      leverageMultiplier = 2.2;
      dependencies = ['AWS Cloud Services', 'Linux Systems'];
    } else if (mSkill.skillId === 'aws') {
      downstreamUnlocks = ['IAM & Identity', 'Terraform', 'SIEM', 'Cloud Security'];
      leverageMultiplier = 2.5;
    } else if (mSkill.skillId === 'docker') {
      downstreamUnlocks = ['Kubernetes', 'Container Security'];
      leverageMultiplier = 1.6;
    } else if (mSkill.skillId === 'python') {
      downstreamUnlocks = ['Automation Scripting', 'Security Tooling'];
      leverageMultiplier = 1.5;
    }

    // Priority Score formula: (Gap Size * Leverage * Market Demand Weight)
    const priorityScore = Math.round(gapSize * leverageMultiplier * (mSkill.demandScore / 100) * 10) / 10;

    return {
      skillId: mSkill.skillId,
      skillName: mSkill.name,
      userScore,
      marketDemand: mSkill.demandScore,
      gapSize,
      surplus,
      status,
      dependencies,
      downstreamUnlocks,
      leverageMultiplier,
      priorityScore,
    };
  });

  // Sort descending by priority score
  rawGaps.sort((a, b) => b.priorityScore - a.priorityScore);

  return rawGaps.map((item, index) => ({
    ...item,
    priorityRank: index + 1,
  }));
}
