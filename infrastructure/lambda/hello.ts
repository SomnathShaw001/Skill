import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const S3_WEBSITE_URL = 'http://skillgraph-app-430398381924.s3-website-us-east-1.amazonaws.com/';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const acceptHeader = event.headers?.accept || event.headers?.Accept || '';
  const wantsJson =
    event.queryStringParameters?.format === 'json' ||
    (acceptHeader.includes('application/json') && !acceptHeader.includes('text/html'));

  if (wantsJson) {
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
          appUrl: S3_WEBSITE_URL,
          githubUrl: 'https://github.com/SomnathShaw001/Skill',
        },
        null,
        2
      ),
    };
  }

  // Redirect browser visitors directly to the Next.js S3 web application
  return {
    statusCode: 302,
    headers: {
      Location: S3_WEBSITE_URL,
      'Cache-Control': 'no-cache',
    },
    body: '',
  };
};
