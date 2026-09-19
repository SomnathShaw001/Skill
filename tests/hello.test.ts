import { handler } from '../infrastructure/lambda/hello';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Hello SkillGraph Lambda Handler', () => {
  it('should return 200 with valid product metadata and pass/fail gate status', async () => {
    const mockEvent = {
      httpMethod: 'GET',
      path: '/hello',
      headers: {},
      queryStringParameters: null,
      body: null,
    } as unknown as APIGatewayProxyEvent;

    const response = await handler(mockEvent);

    expect(response.statusCode).toBe(200);
    expect(response.headers?.['Content-Type']).toBe('application/json');

    const body = JSON.parse(response.body);
    expect(body.product).toBe('SkillGraph');
    expect(body.status).toBe('LIVE_ON_AWS');
    expect(body.lane).toBe('#startup');
    expect(body.category).toBe('#commercial-potential');
    expect(body.tagline).toContain('skill graph');
  });
});
