#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SkillGraphStack } from '../lib/skillgraph-stack';

const app = new cdk.App();

new SkillGraphStack(app, 'SkillGraphStack', {
  description: 'SkillGraph - Career Intelligence Platform (AWS Zero to Shipped Hackathon)',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
    region: process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || 'us-east-1',
  },
  tags: {
    Project: 'SkillGraph',
    Environment: 'Production',
    Hackathon: 'AWS-Zero-to-Shipped',
    Lane: 'Startup',
    Category: 'Commercial-Potential',
  },
});
