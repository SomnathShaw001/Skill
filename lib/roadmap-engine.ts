/**
 * SkillGraph — Roadmap Engine & Learn-Build-Prove Generator (Day 9 / Tasks 9.1, 9.2, 9.3, 9.5)
 * Dynamic sprint generation grounded in gap data and weekly hours constraint.
 * Reference: GoThrough.txt § 8, § 9, § 17 (Steps 7 & 8), § 21 (Day 9).
 */

export interface SprintDeliverable {
  id: string;
  title: string;
  category: 'LEARN' | 'BUILD' | 'PROVE';
  estimatedHours: number;
  completed: boolean;
  provenEvidenceUnlock: string;
}

export interface SprintWeek {
  weekNumber: number;
  phase: 'LEARN' | 'BUILD' | 'PROVE';
  title: string;
  focusSkill: string;
  weeklyTargetHours: number;
  deliverables: SprintDeliverable[];
  outcomeSummary: string;
}

export interface DynamicSprintPlan {
  sprintName: string;
  targetRole: string;
  weeklyHoursBudget: number;
  totalSprintDays: number;
  totalEstimatedHours: number;
  pacingMode: 'CONSTRAINED' | 'STANDARD' | 'ACCELERATED';
  velocityDescription: string;
  weeks: SprintWeek[];
  expectedEvidenceOutcomes: string[];
}

/**
 * Generates a dynamic 30/60/90-day sprint plan based on weekly hours and target role.
 * Implements the GoThrough § 17 Step 8 "wow moment" constraint recalculation.
 */
export function generateDynamicSprintPlan(
  weeklyHours: number = 8,
  durationDays: number = 30,
  targetRole: string = 'Cloud Security Engineer'
): DynamicSprintPlan {
  const weeksCount = Math.round(durationDays / 7);
  const totalEstimatedHours = weeklyHours * weeksCount;

  let pacingMode: DynamicSprintPlan['pacingMode'] = 'STANDARD';
  let velocityDescription = 'Standard 8 hrs/week pacing — balanced learning and artifact building.';

  if (weeklyHours <= 5) {
    pacingMode = 'CONSTRAINED';
    velocityDescription = 'Constrained 5 hrs/week budget — tasks streamlined to high-leverage minimum viable deliverables.';
  } else if (weeklyHours >= 15) {
    pacingMode = 'ACCELERATED';
    velocityDescription = 'Accelerated 15+ hrs/week pacing — advanced multi-tier deployment and test coverage.';
  }

  // Week 1: LEARN (GoThrough § 8: WEEK 1 Learn: AWS IAM fundamentals)
  const week1Deliverables: SprintDeliverable[] = [
    {
      id: 'd-101',
      title: 'Study AWS IAM least-privilege architecture, RBAC, and ABAC principles',
      category: 'LEARN',
      estimatedHours: weeklyHours <= 5 ? 2.5 : 4,
      completed: true,
      provenEvidenceUnlock: 'IAM Conceptual Mastery',
    },
    {
      id: 'd-102',
      title: 'Analyze Service Control Policies (SCPs) and Permission Boundaries in AWS Organizations',
      category: 'LEARN',
      estimatedHours: weeklyHours <= 5 ? 2.5 : 4,
      completed: true,
      provenEvidenceUnlock: 'AWS Multi-Account Governance',
    },
  ];

  // Week 2: BUILD / MONITORING (GoThrough § 8: WEEK 2 Build: Least-privilege AWS architecture)
  const week2Deliverables: SprintDeliverable[] = [
    {
      id: 'd-201',
      title: 'Construct least-privilege IAM roles and assume-role STS trust relationships',
      category: 'BUILD',
      estimatedHours: weeklyHours <= 5 ? 2.5 : 4,
      completed: false,
      provenEvidenceUnlock: 'AWS IAM Verified Code Artifacts',
    },
    {
      id: 'd-202',
      title: 'Configure CloudWatch Logs Insights and GuardDuty threat monitoring alerts',
      category: 'BUILD',
      estimatedHours: weeklyHours <= 5 ? 2.5 : 4,
      completed: false,
      provenEvidenceUnlock: 'SIEM & Detection Engineering Signal',
    },
  ];

  // Week 3: BUILD / TERRAFORM (GoThrough § 8: WEEK 3 Build: Terraform infrastructure)
  const week3Deliverables: SprintDeliverable[] = [
    {
      id: 'd-301',
      title: 'Write reusable Terraform modules for VPC isolation and IAM least privilege',
      category: 'BUILD',
      estimatedHours: weeklyHours <= 5 ? 3 : 5,
      completed: false,
      provenEvidenceUnlock: 'Terraform (IaC) Verified Code Evidence',
    },
    {
      id: 'd-302',
      title: 'Integrate Checkov automated static analysis to audit Terraform manifests',
      category: 'BUILD',
      estimatedHours: weeklyHours <= 5 ? 2 : 3,
      completed: false,
      provenEvidenceUnlock: 'Policy-as-Code Static Security Evidence',
    },
  ];

  // Week 4: PROVE (GoThrough § 8: WEEK 4 Prove: Deploy + document + test)
  const week4Deliverables: SprintDeliverable[] = [
    {
      id: 'd-401',
      title: 'Execute live AWS deployment via GitHub Actions CI/CD automation',
      category: 'PROVE',
      estimatedHours: weeklyHours <= 5 ? 2.5 : 4,
      completed: false,
      provenEvidenceUnlock: 'Live AWS Deployment Public Proof',
    },
    {
      id: 'd-402',
      title: 'Publish GitHub repository documentation, architecture diagrams, and test suite',
      category: 'PROVE',
      estimatedHours: weeklyHours <= 5 ? 2.5 : 4,
      completed: false,
      provenEvidenceUnlock: 'GitHub Verified Portfolio Project',
    },
  ];

  const weeks: SprintWeek[] = [
    {
      weekNumber: 1,
      phase: 'LEARN',
      title: 'AWS IAM & Multi-Account Architecture',
      focusSkill: 'AWS IAM & Identity',
      weeklyTargetHours: weeklyHours,
      deliverables: week1Deliverables,
      outcomeSummary: 'Closes conceptual IAM gap and establishes architectural foundations.',
    },
    {
      weekNumber: 2,
      phase: 'BUILD',
      title: 'Least-Privilege Infrastructure & SIEM',
      focusSkill: 'SIEM & Threat Monitoring',
      weeklyTargetHours: weeklyHours,
      deliverables: week2Deliverables,
      outcomeSummary: 'Builds verified detection monitoring and cloud audit hooks.',
    },
    {
      weekNumber: 3,
      phase: 'BUILD',
      title: 'Terraform Infrastructure as Code',
      focusSkill: 'Terraform (IaC)',
      weeklyTargetHours: weeklyHours,
      deliverables: week3Deliverables,
      outcomeSummary: 'Resolves the #1 systemic leverage bottleneck (unlocking downstream infra).',
    },
    {
      weekNumber: 4,
      phase: 'PROVE',
      title: 'Deploy, Validate & Update Skill Graph',
      focusSkill: 'Proof & Portfolio Demonstration',
      weeklyTargetHours: weeklyHours,
      deliverables: week4Deliverables,
      outcomeSummary: 'Produces verifiable code artifacts in GitHub, boosting readiness to 82%.',
    },
  ];

  return {
    sprintName: `${durationDays}-Day Career Acceleration Sprint`,
    targetRole,
    weeklyHoursBudget: weeklyHours,
    totalSprintDays: durationDays,
    totalEstimatedHours,
    pacingMode,
    velocityDescription,
    weeks,
    expectedEvidenceOutcomes: [
      '✓ IAM Evidence: Verified least-privilege roles and trust policies',
      '✓ AWS Evidence: Production cloud monitoring and log aggregation',
      '✓ Terraform Evidence: Modular HCL code audited with Checkov',
      '✓ Portfolio Project: Public GitHub repo with passing CI/CD tests',
    ],
  };
}
