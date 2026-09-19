/**
 * DynamoDB Skill Schema & Adjacency Representation
 * Reference: GoThrough.txt § 2, docs/database-design.md
 */

export interface DynamoDBSkillRecord {
  PK: string;                     // USER#{userId} or TAXONOMY#SKILLS
  SK: string;                     // SKILL#{skillId}
  skillId: string;
  name: string;
  category: 'Cloud' | 'Security' | 'Engineering' | 'Data';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  marketDemand: number;           // 0 - 100
  evidenceStrength: number;       // 0 - 100
  confidenceScore: number;        // 0 - 100
  assessmentTier: 'Strong' | 'Moderate' | 'Weak' | 'Insufficient';
  dependencies: string[];         // Parent node IDs
  downstreamUnlocks: string[];     // Unlocked capability IDs
  trend: 'UP_RAPID' | 'UP' | 'STABLE' | 'DOWN';
  trendSymbol: string;
  verifiedCount: number;
  evidenceSources: {
    type: 'RESUME' | 'GITHUB_REPO' | 'CERTIFICATION' | 'ASSESSMENT';
    reference: string;
    snippet: string;
  }[];
  GSI1PK?: string;                // USER#{userId}#SKILLS
  GSI1SK?: string;                // CATEGORY#{category}#{skillId}
  updatedAt: string;
}
