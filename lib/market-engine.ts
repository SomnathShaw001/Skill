/**
 * SkillGraph — Market Intelligence Calculation Engine (Day 7 / Tasks 7.4 & 7.5)
 * Reference: GoThrough.txt § 5, § 6, § 21 (Day 7).
 */

import marketData from '../database/market-dataset.json';

export interface MarketSkillDetail {
  skillId: string;
  name: string;
  demandScore: number;
  trend: 'up-up' | 'up' | 'flat' | 'down';
  trendLabel: string;
  trendArrow: string;
  frequency: number;
  topMentionedIn?: string[];
  relevance: string;
}

export interface RoleMarketProfile {
  roleId: string;
  title: string;
  category: string;
  averageSalary: string;
  marketGrowthRate: string;
  skills: MarketSkillDetail[];
}

/**
 * Returns formatted market intelligence profile for a target role.
 */
export function getMarketProfileForRole(roleId: string): RoleMarketProfile {
  const dataset = (marketData.roles as any)[roleId] || marketData.roles['cloud-security-engineer'];

  const formattedSkills: MarketSkillDetail[] = dataset.skills.map((s: any) => {
    let trendArrow = '→';
    let trendLabel = 'Stable';

    if (s.trend === 'up-up') {
      trendArrow = '↑↑';
      trendLabel = 'Explosive (+26%)';
    } else if (s.trend === 'up') {
      trendArrow = '↑';
      trendLabel = 'Rising (+12%)';
    } else if (s.trend === 'down') {
      trendArrow = '↓';
      trendLabel = 'Declining (-8%)';
    }

    return {
      skillId: s.skillId,
      name: s.name,
      demandScore: s.demandScore,
      trend: s.trend,
      trendLabel,
      trendArrow,
      frequency: s.frequency,
      topMentionedIn: s.topMentionedIn || [],
      relevance: s.relevance || 'Medium',
    };
  });

  return {
    roleId: dataset.roleId,
    title: dataset.title,
    category: dataset.category,
    averageSalary: dataset.averageSalary,
    marketGrowthRate: dataset.marketGrowthRate,
    skills: formattedSkills,
  };
}

/**
 * Calculates Market Alignment % comparing candidate skills against market demand.
 */
export function calculateMarketAlignment(
  userSkills: Array<{ skillId: string; evidenceStrength: number }>,
  roleId: string = 'cloud-security-engineer'
): number {
  const market = getMarketProfileForRole(roleId);
  let totalWeight = 0;
  let accumulatedAlignment = 0;

  for (const mSkill of market.skills) {
    totalWeight += mSkill.demandScore;
    const userSkill = userSkills.find((u) => u.skillId === mSkill.skillId);
    if (userSkill) {
      // Alignment contribution: min(user evidence / market demand, 1.0) * demand
      const matchRatio = Math.min(userSkill.evidenceStrength / mSkill.demandScore, 1.0);
      accumulatedAlignment += matchRatio * mSkill.demandScore;
    }
  }

  return totalWeight > 0 ? Math.round((accumulatedAlignment / totalWeight) * 100) : 0;
}
