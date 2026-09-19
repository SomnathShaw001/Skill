/**
 * SkillGraph — Amazon Bedrock Career Agent Lambda (Day 10 / Tasks 10.1 & 10.2)
 * Serverless function invoking Amazon Bedrock with Tool Use (Function Calling).
 * Reference: GoThrough.txt § 10, § 11, § 17 (Step 6), § 21 (Day 10), § 22.
 */

import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import {
  CAREER_AGENT_SYSTEM_PROMPT,
  BEDROCK_CAREER_AGENT_TOOLS,
  queryCareerAgent,
} from '../../agents/career-agent';

const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });

export const handler = async (event: any): Promise<any> => {
  console.log('SkillGraph Career Agent Lambda invoked with event:', JSON.stringify(event));

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
    const userQuery = body.query || body.message || 'Why am I not ready for this role?';
    const userId = body.userId || 'user_demo_somnath';
    const targetRole = body.targetRole || 'Cloud Security Engineer';
    const weeklyHours = body.weeklyHours || 8;

    // Execute Grounded Career Agent
    const agentResult = await queryCareerAgent(userQuery, userId, targetRole, weeklyHours);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      },
      body: JSON.stringify({
        status: 'SUCCESS',
        query: userQuery,
        ...agentResult,
        model: 'anthropic.claude-3-haiku-20240307-v1:0 (via Amazon Bedrock)',
        antiHallucinationInvariantEnforced: true,
      }),
    };
  } catch (error: any) {
    console.error('Career Agent Lambda error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Career Agent execution failure' }),
    };
  }
};
