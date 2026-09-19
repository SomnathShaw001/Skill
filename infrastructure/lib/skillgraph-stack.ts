import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class SkillGraphStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly api: apigateway.RestApi;
  public readonly table: dynamodb.Table;
  public readonly documentBucket: s3.Bucket;
  public readonly helloFunction: nodejs.NodejsFunction;

  constructor(scope: Construct, id: string, idProps?: cdk.StackProps) {
    super(scope, id, idProps);

    // =========================================================================
    // 1. DYNAMODB SINGLE-TABLE DATA STORE (GoThrough.txt § 11, docs/database-design.md)
    // =========================================================================
    this.table = new dynamodb.Table(this, 'SkillGraphTable', {
      tableName: 'SkillGraphTable',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: true,
      },
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Global Secondary Index 1 (GSI1) for inverted query access patterns
    this.table.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'GSI1PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI1SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // =========================================================================
    // 2. ENCRYPTED DOCUMENT STORAGE BUCKET (GoThrough.txt § 11, docs/security-model.md)
    // =========================================================================
    this.documentBucket = new s3.Bucket(this, 'SkillGraphDocumentBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.POST, s3.HttpMethods.GET],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          maxAge: 3000,
        },
      ],
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // =========================================================================
    // 3. AWS COGNITO AUTHENTICATION (Task 2.5 - GoThrough.txt § 11, docs/security-model.md)
    // =========================================================================
    this.userPool = new cognito.UserPool(this, 'SkillGraphUserPool', {
      userPoolName: 'skillgraph-user-pool',
      selfSignUpEnabled: true,
      signInAliases: { email: true, username: false },
      autoVerify: { email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
        fullname: { required: false, mutable: true },
      },
      customAttributes: {
        targetRole: new cognito.StringAttribute({ mutable: true }),
        weeklyHours: new cognito.NumberAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 10,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.userPoolClient = new cognito.UserPoolClient(this, 'SkillGraphUserPoolClient', {
      userPool: this.userPool,
      userPoolClientName: 'skillgraph-web-client',
      generateSecret: false, // Public client for browser Next.js application
      authFlows: {
        userSrp: true,
        userPassword: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
      },
    });

    // =========================================================================
    // 4. LEAST-PRIVILEGE IAM ROLES (Task 2.2 - docs/security-model.md)
    // =========================================================================
    // Hello Lambda Role
    const helloRole = new iam.Role(this, 'SkillGraphHelloRole', {
      roleName: 'SkillGraph-HelloLambda-Role',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Profile Service Role
    const profileRole = new iam.Role(this, 'SkillGraphProfileRole', {
      roleName: 'SkillGraph-ProfileService-Role',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });
    this.table.grantReadWriteData(profileRole);

    // Skill Engine Role
    const skillRole = new iam.Role(this, 'SkillGraphSkillRole', {
      roleName: 'SkillGraph-SkillEngine-Role',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });
    this.table.grantReadWriteData(skillRole);

    // Market Engine Role (Read-only on market partition)
    const marketRole = new iam.Role(this, 'SkillGraphMarketRole', {
      roleName: 'SkillGraph-MarketEngine-Role',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });
    this.table.grantReadData(marketRole);

    // Resume Worker Role
    const resumeRole = new iam.Role(this, 'SkillGraphResumeRole', {
      roleName: 'SkillGraph-ResumeWorker-Role',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });
    this.documentBucket.grantRead(resumeRole);
    this.table.grantReadWriteData(resumeRole);
    resumeRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['bedrock:InvokeModel'],
        resources: ['arn:aws:bedrock:*::foundation-model/*'],
      })
    );

    // Career Agent Role
    const agentRole = new iam.Role(this, 'SkillGraphCareerAgentRole', {
      roleName: 'SkillGraph-CareerAgent-Role',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });
    this.table.grantReadData(agentRole);
    agentRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['bedrock:InvokeModel'],
        resources: ['arn:aws:bedrock:*::foundation-model/*'],
      })
    );

    // =========================================================================
    // 5. HELLO SKILLGRAPH LAMBDA (Task 2.7 - Public Endpoint Function)
    // =========================================================================
    this.helloFunction = new nodejs.NodejsFunction(this, 'HelloSkillGraphFunction', {
      entry: path.join(__dirname, '../lambda/hello.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      architecture: lambda.Architecture.ARM_64,
      role: helloRole,
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        TABLE_NAME: this.table.tableName,
        USER_POOL_ID: this.userPool.userPoolId,
        CLIENT_ID: this.userPoolClient.userPoolClientId,
        ENVIRONMENT: 'production',
      },
      bundling: {
        minify: true,
        sourceMap: false,
        target: 'node20',
      },
    });

    // =========================================================================
    // 6. AMAZON API GATEWAY SKELETON (Task 2.6 - GoThrough.txt § 11)
    // =========================================================================
    this.api = new apigateway.RestApi(this, 'SkillGraphApi', {
      restApiName: 'SkillGraph-Api',
      description: 'API Gateway for SkillGraph Career Intelligence Platform',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key'],
      },
      deployOptions: {
        stageName: 'prod',
        throttlingRateLimit: 100,
        throttlingBurstLimit: 200,
      },
    });

    // Cognito Authorizer for protected routes
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      'SkillGraphCognitoAuthorizer',
      {
        cognitoUserPools: [this.userPool],
        authorizerName: 'CognitoAuthorizer',
      }
    );

    // Public "Hello SkillGraph" root route & GET /hello (Task 2.7)
    const helloIntegration = new apigateway.LambdaIntegration(this.helloFunction);
    
    // GET /
    this.api.root.addMethod('GET', helloIntegration);

    // GET /hello
    const helloResource = this.api.root.addResource('hello');
    helloResource.addMethod('GET', helloIntegration);

    // Skeleton routes for Day 3+ (Protected by Cognito Authorizer)
    const apiV1 = this.api.root.addResource('api').addResource('v1');
    const profileResource = apiV1.addResource('profile');
    profileResource.addMethod('GET', helloIntegration, { authorizer });

    const skillsResource = apiV1.addResource('skills');
    skillsResource.addMethod('GET', helloIntegration, { authorizer });

    const marketResource = apiV1.addResource('market');
    marketResource.addMethod('GET', helloIntegration); // Market data is public readable

    const gapResource = apiV1.addResource('gap');
    gapResource.addMethod('GET', helloIntegration, { authorizer });

    const roadmapResource = apiV1.addResource('roadmap');
    roadmapResource.addMethod('GET', helloIntegration, { authorizer });

    const agentResource = apiV1.addResource('agent');
    agentResource.addMethod('POST', helloIntegration, { authorizer });

    // =========================================================================
    // 7. CLOUDFORMATION STACK OUTPUTS (Task 2.7 & 2.8)
    // =========================================================================
    new cdk.CfnOutput(this, 'PublicHelloUrl', {
      value: this.api.url,
      description: 'Public HTTPS URL for Hello SkillGraph deployment (Pass/Fail Gate)',
      exportName: 'SkillGraph-PublicHelloUrl',
    });

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
      description: 'AWS Cognito User Pool ID',
      exportName: 'SkillGraph-UserPoolId',
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
      description: 'AWS Cognito User Pool Web Client ID',
      exportName: 'SkillGraph-UserPoolClientId',
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: this.table.tableName,
      description: 'DynamoDB Single-Table Name',
      exportName: 'SkillGraph-TableName',
    });

    new cdk.CfnOutput(this, 'DocumentBucketName', {
      value: this.documentBucket.bucketName,
      description: 'S3 Document & Resume Ingestion Bucket',
      exportName: 'SkillGraph-DocumentBucketName',
    });
  }
}
