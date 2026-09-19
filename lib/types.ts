export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type EvidenceStrengthTier = 'Strong' | 'Moderate' | 'Weak' | 'Insufficient';
export type TrendDirection = 'UP_RAPID' | 'UP' | 'STABLE' | 'DOWN';

export interface UserProfile {
  userId: string;
  email: string;
  name: string;
  targetRole: string;
  weeklyHoursCommitment: number;
  careerReadiness: number;
  marketAlignment: number;
  evidenceStrength: number;
  skillCoverage: number;
  criticalGapsCount: number;
  verifiedSkillsCount: number;
  updatedAt: string;
}

export interface SkillNode {
  skillId: string;
  name: string;
  category: 'Cloud' | 'Security' | 'Engineering' | 'Data';
  selfReportedLevel: ProficiencyLevel;
  evidenceStrength: number; // 0 - 100
  confidenceScore: number;  // 0 - 100
  assessmentTier: EvidenceStrengthTier;
  evidenceCount: number;
  verified: boolean;
  dependencies?: string[];
  downstreamUnlocks?: string[];
}

export interface EvidenceItem {
  evidenceId: string;
  skillId: string;
  skillName: string;
  sourceType: 'RESUME' | 'GITHUB_REPO' | 'CERTIFICATION' | 'ASSESSMENT';
  sourceReference: string;
  summary: string;
  weightContribution: number;
  timestamp: string;
}

export interface MarketSkill {
  skillId: string;
  skillName: string;
  demandScore: number;       // 0 - 100
  frequencyPercentage: number;
  trend: TrendDirection;
  trendSymbol: string;
  currentEvidenceScore: number;
  isCriticalGap: boolean;
}

export interface CareerGap {
  skillId: string;
  skillName: string;
  userScore: number;
  marketDemand: number;
  rawGap: number;
  leverageMultiplier: number;
  priorityRank: number;
  downstreamUnlocks: string[];
}

export interface SprintWeek {
  weekNumber: number;
  phase: 'LEARN' | 'BUILD' | 'PROVE';
  focusSkill: string;
  deliverables: string[];
}

export interface SprintRoadmap {
  roadmapId: string;
  targetRole: string;
  allocatedHoursPerWeek: number;
  durationDays: number;
  weeks: SprintWeek[];
  expectedOutcomes: string[];
}
