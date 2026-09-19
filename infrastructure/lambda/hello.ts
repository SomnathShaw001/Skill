import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify(
      {
        product: 'SkillGraph',
        message: 'Hello SkillGraph - Career Intelligence Platform',
        version: '1.0.0',
        status: 'LIVE_ON_AWS',
        hackathon: 'AWS Zero to Shipped (September 18 - October 2, 2026)',
        lane: '#startup',
        category: '#commercial-potential',
        tagline: "Your career is not a résumé. It's a continuously changing skill graph.",
        timestamp: new Date().toISOString(),
      },
      null,
      2
    ),
  };
};
