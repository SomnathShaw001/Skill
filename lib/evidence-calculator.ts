import { ProficiencyLevel, EvidenceStrengthTier } from './types';

export interface EvidenceEvaluationInput {
  selfReportedLevel: ProficiencyLevel;
  githubRepoCount: number;
  hasCodeTests: boolean;
  hasCiCdPipeline: boolean;
  certificationCount: number;
  resumeMentionCount: number;
}

export interface EvidenceEvaluationResult {
  evidenceStrength: number; // 0 - 100
  confidenceScore: number;  // 0 - 100
  tier: EvidenceStrengthTier;
  summary: string;
}

/**
 * Calculates evidence strength and confidence score based on multi-source proof
 * Reference: GoThrough.txt § 3 ("SkillGraph measures what you can demonstrate, not merely claim")
 */
export function calculateEvidenceStrength(input: EvidenceEvaluationInput): EvidenceEvaluationResult {
  let score = 0;

  // 1. GitHub Repositories (Up to 40 points)
  if (input.githubRepoCount >= 5) {
    score += 40;
  } else if (input.githubRepoCount >= 2) {
    score += 25;
  } else if (input.githubRepoCount === 1) {
    score += 15;
  }

  // 2. Automated Testing Detected in Code (Up to 20 points)
  if (input.hasCodeTests) {
    score += 20;
  }

  // 3. CI/CD DevOps Workflows (Up to 15 points)
  if (input.hasCiCdPipeline) {
    score += 15;
  }

  // 4. Validated Certifications (Up to 15 points)
  if (input.certificationCount >= 1) {
    score += 15;
  }

  // 5. Resume Experience Weight (Up to 10 points)
  if (input.resumeMentionCount >= 1) {
    score += 10;
  }

  // Cap at 100
  const evidenceStrength = Math.min(100, Math.max(0, score));

  // Determine Confidence Score (cross-corroboration certainty)
  const sourcesCount =
    (input.githubRepoCount > 0 ? 1 : 0) +
    (input.hasCodeTests ? 1 : 0) +
    (input.certificationCount > 0 ? 1 : 0) +
    (input.resumeMentionCount > 0 ? 1 : 0);

  const confidenceScore = Math.min(
    100,
    Math.round(evidenceStrength * 0.7 + sourcesCount * 8)
  );

  // Classify Tier
  let tier: EvidenceStrengthTier = 'Insufficient';
  let summary = 'Insufficient evidence to substantiate claimed proficiency';

  if (evidenceStrength >= 75) {
    tier = 'Strong';
    summary = 'Strong multi-source evidence detected across code repositories and credentials';
  } else if (evidenceStrength >= 40) {
    tier = 'Moderate';
    summary = 'Moderate evidence found; supported by repository code or credentials';
  } else if (evidenceStrength >= 15) {
    tier = 'Weak';
    summary = 'Weak evidence; primarily self-reported without verified code implementations';
  }

  return {
    evidenceStrength,
    confidenceScore,
    tier,
    summary,
  };
}
