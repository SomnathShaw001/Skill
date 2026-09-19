/**
 * SkillGraph — Canonical Skill Normalizer Engine (Day 5 / Task 5.4)
 * Maps raw resume tokens and GitHub manifests to canonical taxonomy nodes.
 * Reference: GoThrough.txt § 2, § 3, § 21 (Day 5).
 */

export interface CanonicalSkillMapping {
  skillId: string;
  name: string;
  category: 'Cloud' | 'Security' | 'DevOps' | 'Software Engineering' | 'Data & AI' | 'Networking';
  aliases: string[];
  downstreamUnlocks: string[];
}

export const CANONICAL_TAXONOMY: Record<string, CanonicalSkillMapping> = {
  'aws': {
    skillId: 'aws',
    name: 'AWS Cloud Services',
    category: 'Cloud',
    aliases: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'boto3', 'cloudformation', 'bedrock', 'eventbridge'],
    downstreamUnlocks: ['iam', 'terraform', 'siem', 'kubernetes'],
  },
  'iam': {
    skillId: 'iam',
    name: 'AWS IAM & Identity',
    category: 'Security',
    aliases: ['iam', 'identity and access management', 'rbac', 'least privilege', 'cognito', 'sts', 'assume role', 'iam policy'],
    downstreamUnlocks: ['siem', 'cloud-security-projects'],
  },
  'terraform': {
    skillId: 'terraform',
    name: 'Terraform (IaC)',
    category: 'DevOps',
    aliases: ['terraform', 'hcl', 'opentofu', 'infrastructure as code', 'iac', 'terragrunt'],
    downstreamUnlocks: ['aws-infrastructure', 'security-infrastructure'],
  },
  'siem': {
    skillId: 'siem',
    name: 'SIEM & Threat Monitoring',
    category: 'Security',
    aliases: ['siem', 'security information and event management', 'splunk', 'cloudwatch logs', 'guardduty', 'security hub', 'soc', 'detection engineering'],
    downstreamUnlocks: ['incident-response', 'threat-hunting'],
  },
  'docker': {
    skillId: 'docker',
    name: 'Docker & Containerization',
    category: 'DevOps',
    aliases: ['docker', 'container', 'dockerfile', 'containerization', 'docker-compose', 'oci'],
    downstreamUnlocks: ['kubernetes', 'ecs'],
  },
  'python': {
    skillId: 'python',
    name: 'Python',
    category: 'Software Engineering',
    aliases: ['python', 'py', 'python3', 'django', 'fastapi', 'flask', 'boto3', 'pytest'],
    downstreamUnlocks: ['automation-scripting', 'cloud-audit-tools'],
  },
  'linux': {
    skillId: 'linux',
    name: 'Linux Systems & CLI',
    category: 'DevOps',
    aliases: ['linux', 'bash', 'unix', 'shell', 'ubuntu', 'debian', 'rhel', 'posix'],
    downstreamUnlocks: ['container-security', 'host-hardening'],
  },
  'kubernetes': {
    skillId: 'kubernetes',
    name: 'Kubernetes (K8s)',
    category: 'DevOps',
    aliases: ['kubernetes', 'k8s', 'kubectl', 'helm', 'eks', 'container orchestration'],
    downstreamUnlocks: ['cluster-security', 'service-mesh'],
  },
  'networking': {
    skillId: 'networking',
    name: 'Network & Cloud Security',
    category: 'Networking',
    aliases: ['networking', 'tcp/ip', 'vpc', 'subnet', 'route table', 'cidr', 'dns', 'vpn', 'security group'],
    downstreamUnlocks: ['zero-trust', 'cloud-perimeter'],
  },
  'cybersecurity': {
    skillId: 'cybersecurity',
    name: 'Cybersecurity Fundamentals',
    category: 'Security',
    aliases: ['cybersecurity', 'infosec', 'vulnerability management', 'cve', 'owasp', 'penetration testing', 'soc2'],
    downstreamUnlocks: ['threat-modeling', 'security-compliance'],
  },
  'iot': {
    skillId: 'iot',
    name: 'IoT & Edge Security',
    category: 'Security',
    aliases: ['iot', 'internet of things', 'mqtt', 'aws iot core', 'embedded', 'edge devices'],
    downstreamUnlocks: ['firmware-security', 'hardware-root-of-trust'],
  },
  'rest-apis': {
    skillId: 'rest-apis',
    name: 'REST API Architecture',
    category: 'Software Engineering',
    aliases: ['rest api', 'restful', 'api gateway', 'endpoints', 'http', 'json api', 'openapi', 'swagger'],
    downstreamUnlocks: ['api-security', 'microservices'],
  },
};

/**
 * Normalizes an extracted raw keyword or phrase to its canonical SkillGraph entity.
 */
export function normalizeSkill(rawToken: string): CanonicalSkillMapping | null {
  const normalized = rawToken.trim().toLowerCase();

  for (const [key, mapping] of Object.entries(CANONICAL_TAXONOMY)) {
    if (key === normalized || mapping.aliases.some((alias) => normalized.includes(alias) || alias.includes(normalized))) {
      return mapping;
    }
  }

  return null;
}

/**
 * Batch normalization of raw extracted tokens from Bedrock or GitHub signals.
 */
export function normalizeSkillBatch(rawTokens: string[]): CanonicalSkillMapping[] {
  const seen = new Set<string>();
  const results: CanonicalSkillMapping[] = [];

  for (const token of rawTokens) {
    const match = normalizeSkill(token);
    if (match && !seen.has(match.skillId)) {
      seen.add(match.skillId);
      results.push(match);
    }
  }

  return results;
}
