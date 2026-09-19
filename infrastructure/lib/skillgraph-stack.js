"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillGraphStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const cognito = __importStar(require("aws-cdk-lib/aws-cognito"));
const apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const nodejs = __importStar(require("aws-cdk-lib/aws-lambda-nodejs"));
const dynamodb = __importStar(require("aws-cdk-lib/aws-dynamodb"));
const s3 = __importStar(require("aws-cdk-lib/aws-s3"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const path = __importStar(require("path"));
class SkillGraphStack extends cdk.Stack {
    userPool;
    userPoolClient;
    api;
    table;
    documentBucket;
    helloFunction;
    constructor(scope, id, idProps) {
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
        resumeRole.addToPolicy(new iam.PolicyStatement({
            actions: ['bedrock:InvokeModel'],
            resources: ['arn:aws:bedrock:*::foundation-model/*'],
        }));
        // Career Agent Role
        const agentRole = new iam.Role(this, 'SkillGraphCareerAgentRole', {
            roleName: 'SkillGraph-CareerAgent-Role',
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
            ],
        });
        this.table.grantReadData(agentRole);
        agentRole.addToPolicy(new iam.PolicyStatement({
            actions: ['bedrock:InvokeModel'],
            resources: ['arn:aws:bedrock:*::foundation-model/*'],
        }));
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
        const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'SkillGraphCognitoAuthorizer', {
            cognitoUserPools: [this.userPool],
            authorizerName: 'CognitoAuthorizer',
        });
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
exports.SkillGraphStack = SkillGraphStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxncmFwaC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraWxsZ3JhcGgtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBRW5DLGlFQUFtRDtBQUNuRCx1RUFBeUQ7QUFDekQsK0RBQWlEO0FBQ2pELHNFQUF3RDtBQUN4RCxtRUFBcUQ7QUFDckQsdURBQXlDO0FBQ3pDLHlEQUEyQztBQUMzQywyQ0FBNkI7QUFFN0IsTUFBYSxlQUFnQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzVCLFFBQVEsQ0FBbUI7SUFDM0IsY0FBYyxDQUF5QjtJQUN2QyxHQUFHLENBQXFCO0lBQ3hCLEtBQUssQ0FBaUI7SUFDdEIsY0FBYyxDQUFZO0lBQzFCLGFBQWEsQ0FBd0I7SUFFckQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxPQUF3QjtRQUNoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxQiw0RUFBNEU7UUFDNUUsb0ZBQW9GO1FBQ3BGLDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdkQsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUNqRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RCxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlO1lBQ2pELFVBQVUsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVc7WUFDaEQsZ0NBQWdDLEVBQUU7Z0JBQ2hDLDBC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QyxLQUFLLENBQUMsU0FBUztZQUMzQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFVBQVUsRUFBRSxzQkFBc0I7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUM1QyxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVO1lBQ3JDLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsVUFBVSxFQUFFLCtCQUErQjtTQUM1QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFqU0QsMENBaVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgY29nbml0byBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29nbml0byc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIG5vZGVqcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqcyc7XG5pbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBjbGFzcyBTa2lsbEdyYXBoU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBwdWJsaWMgcmVhZG9ubHkgdXNlclBvb2w6IGNvZ25pdG8uVXNlclBvb2w7XG4gIHB1YmxpYyByZWFkb25seSB1c2VyUG9vbENsaWVudDogY29nbml0by5Vc2VyUG9vbENsaWVudDtcbiAgcHVibGljIHJlYWRvbmx5IGFwaTogYXBpZ2F0ZXdheS5SZXN0QXBpO1xuICBwdWJsaWMgcmVhZG9ubHkgdGFibGU6IGR5bmFtb2RiLlRhYmxlO1xuICBwdWJsaWMgcmVhZG9ubHkgZG9jdW1lbnRCdWNrZXQ6IHMzLkJ1Y2tldDtcbiAgcHVibGljIHJlYWRvbmx5IGhlbGxvRnVuY3Rpb246IG5vZGVqcy5Ob2RlanNGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBpZFByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIGlkUHJvcHMpO1xuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIDEuIERZTkFNT0RCIFNJTkdMRS1UQUJMRSBEQVRBIFNUT1JFIChHb1Rocm91Z2gudHh0IMKnIDExLCBkb2NzL2RhdGFiYXNlLWRlc2lnbi5tZClcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy50YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnU2tpbGxHcmFwaFRhYmxlJywge1xuICAgICAgdGFibGVOYW1lOiAnU2tpbGxHcmFwaFRhYmxlJyxcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnUEsnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgc29ydEtleTogeyBuYW1lOiAnU0snLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgYmlsbGluZ01vZGU6IGR5bmFtb2RiLkJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcbiAgICAgIGVuY3J5cHRpb246IGR5bmFtb2RiLlRhYmxlRW5jcnlwdGlvbi5BV1NfTUFOQUdFRCxcbiAgICAgIHBvaW50SW5UaW1lUmVjb3ZlcnlTcGVjaWZpY2F0aW9uOiB7XG4gICAgICAgIHBvaW50SW5UaW1lUmVjb3ZlcnlFbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LlJFVEFJTixcbiAgICB9KTtcblxuICAgIC8vIEdsb2JhbCBTZWNvbmRhcnkgSW5kZXggMSAoR1NJMSkgZm9yIGludmVydGVkIHF1ZXJ5IGFjY2VzcyBwYXR0ZXJuc1xuICAgIHRoaXMudGFibGUuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAnR1NJMScsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ0dTSTFQSycsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICBzb3J0S2V5OiB7IG5hbWU6ICdHU0kxU0snLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgcHJvamVjdGlvblR5cGU6IGR5bmFtb2RiLlByb2plY3Rpb25UeXBlLkFMTCxcbiAgICB9KTtcblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAyLiBFTkNSWVBURUQgRE9DVU1FTlQgU1RPUkFHRSBCVUNLRVQgKEdvVGhyb3VnaC50eHQgwqcgMTEsIGRvY3Mvc2VjdXJpdHktbW9kZWwubWQpXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuZG9jdW1lbnRCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdTa2lsbEdyYXBoRG9jdW1lbnRCdWNrZXQnLCB7XG4gICAgICBlbmNyeXB0aW9uOiBzMy5CdWNrZXRFbmNyeXB0aW9uLlMzX01BTkFHRUQsXG4gICAgICBibG9ja1B1YmxpY0FjY2VzczogczMuQmxvY2tQdWJsaWNBY2Nlc3MuQkxPQ0tfQUxMLFxuICAgICAgZW5mb3JjZVNTTDogdHJ1ZSxcbiAgICAgIGNvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFsbG93ZWRNZXRob2RzOiBbczMuSHR0cE1ldGhvZHMuUFVULCBzMy5IdHRwTWV0aG9kcy5QT1NULCBzMy5IdHRwTWV0aG9kcy5HRVRdLFxuICAgICAgICAgIGFsbG93ZWRPcmlnaW5zOiBbJyonXSxcbiAgICAgICAgICBhbGxvd2VkSGVhZGVyczogWycqJ10sXG4gICAgICAgICAgbWF4QWdlOiAzMDAwLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LlJFVEFJTixcbiAgICB9KTtcblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyAzLiBBV1MgQ09HTklUTyBBVVRIRU5USUNBVElPTiAoVGFzayAyLjUgLSBHb1Rocm91Z2gudHh0IMKnIDExLCBkb2NzL3NlY3VyaXR5LW1vZGVsLm1kKVxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnVzZXJQb29sID0gbmV3IGNvZ25pdG8uVXNlclBvb2wodGhpcywgJ1NraWxsR3JhcGhVc2VyUG9vbCcsIHtcbiAgICAgIHVzZXJQb29sTmFtZTogJ3NraWxsZ3JhcGgtdXNlci1wb29sJyxcbiAgICAgIHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxuICAgICAgc2lnbkluQWxpYXNlczogeyBlbWFpbDogdHJ1ZSwgdXNlcm5hbWU6IGZhbHNlIH0sXG4gICAgICBhdXRvVmVyaWZ5OiB7IGVtYWlsOiB0cnVlIH0sXG4gICAgICBzdGFuZGFyZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgZW1haWw6IHsgcmVxdWlyZWQ6IHRydWUsIG11dGFibGU6IHRydWUgfSxcbiAgICAgICAgZnVsbG5hbWU6IHsgcmVxdWlyZWQ6IGZhbHNlLCBtdXRhYmxlOiB0cnVlIH0sXG4gICAgICB9LFxuICAgICAgY3VzdG9tQXR0cmlidXRlczoge1xuICAgICAgICB0YXJnZXRSb2xlOiBuZXcgY29nbml0by5TdHJpbmdBdHRyaWJ1dGUoeyBtdXRhYmxlOiB0cnVlIH0pLFxuICAgICAgICB3ZWVrbHlIb3VyczogbmV3IGNvZ25pdG8uTnVtYmVyQXR0cmlidXRlKHsgbXV0YWJsZTogdHJ1ZSB9KSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZFBvbGljeToge1xuICAgICAgICBtaW5MZW5ndGg6IDEwLFxuICAgICAgICByZXF1aXJlTG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICByZXF1aXJlVXBwZXJjYXNlOiB0cnVlLFxuICAgICAgICByZXF1aXJlRGlnaXRzOiB0cnVlLFxuICAgICAgICByZXF1aXJlU3ltYm9sczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBhY2NvdW50UmVjb3Zlcnk6IGNvZ25pdG8uQWNjb3VudFJlY292ZXJ5LkVNQUlMX09OTFksXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5SRVRBSU4sXG4gICAgfSk7XG5cbiAgICB0aGlzLnVzZXJQb29sQ2xpZW50ID0gbmV3IGNvZ25pdG8uVXNlclBvb2xDbGllbnQodGhpcywgJ1NraWxsR3JhcGhVc2VyUG9vbENsaWVudCcsIHtcbiAgICAgIHVzZXJQb29sOiB0aGlzLnVzZXJQb29sLFxuICAgICAgdXNlclBvb2xDbGllbnROYW1lOiAnc2tpbGxncmFwaC13ZWItY2xpZW50JyxcbiAgICAgIGdlbmVyYXRlU2VjcmV0OiBmYWxzZSwgLy8gUHVibGljIGNsaWVudCBmb3IgYnJvd3NlciBOZXh0LmpzIGFwcGxpY2F0aW9uXG4gICAgICBhdXRoRmxvd3M6IHtcbiAgICAgICAgdXNlclNycDogdHJ1ZSxcbiAgICAgICAgdXNlclBhc3N3b3JkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIG9BdXRoOiB7XG4gICAgICAgIGZsb3dzOiB7XG4gICAgICAgICAgYXV0aG9yaXphdGlvbkNvZGVHcmFudDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVzOiBbXG4gICAgICAgICAgY29nbml0by5PQXV0aFNjb3BlLkVNQUlMLFxuICAgICAgICAgIGNvZ25pdG8uT0F1dGhTY29wZS5PUEVOSUQsXG4gICAgICAgICAgY29nbml0by5PQXV0aFNjb3BlLlBST0ZJTEUsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIDQuIExFQVNULVBSSVZJTEVHRSBJQU0gUk9MRVMgKFRhc2sgMi4yIC0gZG9jcy9zZWN1cml0eS1tb2RlbC5tZClcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSGVsbG8gTGFtYmRhIFJvbGVcbiAgICBjb25zdCBoZWxsb1JvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ1NraWxsR3JhcGhIZWxsb1JvbGUnLCB7XG4gICAgICByb2xlTmFtZTogJ1NraWxsR3JhcGgtSGVsbG9MYW1iZGEtUm9sZScsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICAvLyBQcm9maWxlIFNlcnZpY2UgUm9sZVxuICAgIGNvbnN0IHByb2ZpbGVSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdTa2lsbEdyYXBoUHJvZmlsZVJvbGUnLCB7XG4gICAgICByb2xlTmFtZTogJ1NraWxsR3JhcGgtUHJvZmlsZVNlcnZpY2UtUm9sZScsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgdGhpcy50YWJsZS5ncmFudFJlYWRXcml0ZURhdGEocHJvZmlsZVJvbGUpO1xuXG4gICAgLy8gU2tpbGwgRW5naW5lIFJvbGVcbiAgICBjb25zdCBza2lsbFJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ1NraWxsR3JhcGhTa2lsbFJvbGUnLCB7XG4gICAgICByb2xlTmFtZTogJ1NraWxsR3JhcGgtU2tpbGxFbmdpbmUtUm9sZScsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgdGhpcy50YWJsZS5ncmFudFJlYWRXcml0ZURhdGEoc2tpbGxSb2xlKTtcblxuICAgIC8vIE1hcmtldCBFbmdpbmUgUm9sZSAoUmVhZC1vbmx5IG9uIG1hcmtldCBwYXJ0aXRpb24pXG4gICAgY29uc3QgbWFya2V0Um9sZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnU2tpbGxHcmFwaE1hcmtldFJvbGUnLCB7XG4gICAgICByb2xlTmFtZTogJ1NraWxsR3JhcGgtTWFya2V0RW5naW5lLVJvbGUnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2xhbWJkYS5hbWF6b25hd3MuY29tJyksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlJyksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIHRoaXMudGFibGUuZ3JhbnRSZWFkRGF0YShtYXJrZXRSb2xlKTtcblxuICAgIC8vIFJlc3VtZSBXb3JrZXIgUm9sZVxuICAgIGNvbnN0IHJlc3VtZVJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ1NraWxsR3JhcGhSZXN1bWVSb2xlJywge1xuICAgICAgcm9sZU5hbWU6ICdTa2lsbEdyYXBoLVJlc3VtZVdvcmtlci1Sb2xlJyxcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdsYW1iZGEuYW1hem9uYXdzLmNvbScpLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXG4gICAgICAgIGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnc2VydmljZS1yb2xlL0FXU0xhbWJkYUJhc2ljRXhlY3V0aW9uUm9sZScpLFxuICAgICAgXSxcbiAgICB9KTtcbiAgICB0aGlzLmRvY3VtZW50QnVja2V0LmdyYW50UmVhZChyZXN1bWVSb2xlKTtcbiAgICB0aGlzLnRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShyZXN1bWVSb2xlKTtcbiAgICByZXN1bWVSb2xlLmFkZFRvUG9saWN5KFxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICBhY3Rpb25zOiBbJ2JlZHJvY2s6SW52b2tlTW9kZWwnXSxcbiAgICAgICAgcmVzb3VyY2VzOiBbJ2Fybjphd3M6YmVkcm9jazoqOjpmb3VuZGF0aW9uLW1vZGVsLyonXSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIENhcmVlciBBZ2VudCBSb2xlXG4gICAgY29uc3QgYWdlbnRSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdTa2lsbEdyYXBoQ2FyZWVyQWdlbnRSb2xlJywge1xuICAgICAgcm9sZU5hbWU6ICdTa2lsbEdyYXBoLUNhcmVlckFnZW50LVJvbGUnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2xhbWJkYS5hbWF6b25hd3MuY29tJyksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlJyksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIHRoaXMudGFibGUuZ3JhbnRSZWFkRGF0YShhZ2VudFJvbGUpO1xuICAgIGFnZW50Um9sZS5hZGRUb1BvbGljeShcbiAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgYWN0aW9uczogWydiZWRyb2NrOkludm9rZU1vZGVsJ10sXG4gICAgICAgIHJlc291cmNlczogWydhcm46YXdzOmJlZHJvY2s6Kjo6Zm91bmRhdGlvbi1tb2RlbC8qJ10sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gNS4gSEVMTE8gU0tJTExHUkFQSCBMQU1CREEgKFRhc2sgMi43IC0gUHVibGljIEVuZHBvaW50IEZ1bmN0aW9uKVxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmhlbGxvRnVuY3Rpb24gPSBuZXcgbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdIZWxsb1NraWxsR3JhcGhGdW5jdGlvbicsIHtcbiAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vbGFtYmRhL2hlbGxvLnRzJyksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGFyY2hpdGVjdHVyZTogbGFtYmRhLkFyY2hpdGVjdHVyZS5BUk1fNjQsXG4gICAgICByb2xlOiBoZWxsb1JvbGUsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMCksXG4gICAgICBtZW1vcnlTaXplOiAyNTYsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiB0aGlzLnRhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgVVNFUl9QT09MX0lEOiB0aGlzLnVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICAgIENMSUVOVF9JRDogdGhpcy51c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgICAgICBFTlZJUk9OTUVOVDogJ3Byb2R1Y3Rpb24nLFxuICAgICAgfSxcbiAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgICAgc291cmNlTWFwOiBmYWxzZSxcbiAgICAgICAgdGFyZ2V0OiAnbm9kZTIwJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gNi4gQU1BWk9OIEFQSSBHQVRFV0FZIFNLRUxFVE9OIChUYXNrIDIuNiAtIEdvVGhyb3VnaC50eHQgwqcgMTEpXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCAnU2tpbGxHcmFwaEFwaScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnU2tpbGxHcmFwaC1BcGknLFxuICAgICAgZGVzY3JpcHRpb246ICdBUEkgR2F0ZXdheSBmb3IgU2tpbGxHcmFwaCBDYXJlZXIgSW50ZWxsaWdlbmNlIFBsYXRmb3JtJyxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWdhdGV3YXkuQ29ycy5BTExfT1JJR0lOUyxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBhcGlnYXRld2F5LkNvcnMuQUxMX01FVEhPRFMsXG4gICAgICAgIGFsbG93SGVhZGVyczogWydDb250ZW50LVR5cGUnLCAnQXV0aG9yaXphdGlvbicsICdYLUFtei1EYXRlJywgJ1gtQXBpLUtleSddLFxuICAgICAgfSxcbiAgICAgIGRlcGxveU9wdGlvbnM6IHtcbiAgICAgICAgc3RhZ2VOYW1lOiAncHJvZCcsXG4gICAgICAgIHRocm90dGxpbmdSYXRlTGltaXQ6IDEwMCxcbiAgICAgICAgdGhyb3R0bGluZ0J1cnN0TGltaXQ6IDIwMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBDb2duaXRvIEF1dGhvcml6ZXIgZm9yIHByb3RlY3RlZCByb3V0ZXNcbiAgICBjb25zdCBhdXRob3JpemVyID0gbmV3IGFwaWdhdGV3YXkuQ29nbml0b1VzZXJQb29sc0F1dGhvcml6ZXIoXG4gICAgICB0aGlzLFxuICAgICAgJ1NraWxsR3JhcGhDb2duaXRvQXV0aG9yaXplcicsXG4gICAgICB7XG4gICAgICAgIGNvZ25pdG9Vc2VyUG9vbHM6IFt0aGlzLnVzZXJQb29sXSxcbiAgICAgICAgYXV0aG9yaXplck5hbWU6ICdDb2duaXRvQXV0aG9yaXplcicsXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFB1YmxpYyBcIkhlbGxvIFNraWxsR3JhcGhcIiByb290IHJvdXRlICYgR0VUIC9oZWxsbyAoVGFzayAyLjcpXG4gICAgY29uc3QgaGVsbG9JbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKHRoaXMuaGVsbG9GdW5jdGlvbik7XG4gICAgXG4gICAgLy8gR0VUIC9cbiAgICB0aGlzLmFwaS5yb290LmFkZE1ldGhvZCgnR0VUJywgaGVsbG9JbnRlZ3JhdGlvbik7XG5cbiAgICAvLyBHRVQgL2hlbGxvXG4gICAgY29uc3QgaGVsbG9SZXNvdXJjZSA9IHRoaXMuYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2hlbGxvJyk7XG4gICAgaGVsbG9SZXNvdXJjZS5hZGRNZXRob2QoJ0dFVCcsIGhlbGxvSW50ZWdyYXRpb24pO1xuXG4gICAgLy8gU2tlbGV0b24gcm91dGVzIGZvciBEYXkgMysgKFByb3RlY3RlZCBieSBDb2duaXRvIEF1dGhvcml6ZXIpXG4gICAgY29uc3QgYXBpVjEgPSB0aGlzLmFwaS5yb290LmFkZFJlc291cmNlKCdhcGknKS5hZGRSZXNvdXJjZSgndjEnKTtcbiAgICBjb25zdCBwcm9maWxlUmVzb3VyY2UgPSBhcGlWMS5hZGRSZXNvdXJjZSgncHJvZmlsZScpO1xuICAgIHByb2ZpbGVSZXNvdXJjZS5hZGRNZXRob2QoJ0dFVCcsIGhlbGxvSW50ZWdyYXRpb24sIHsgYXV0aG9yaXplciB9KTtcblxuICAgIGNvbnN0IHNraWxsc1Jlc291cmNlID0gYXBpVjEuYWRkUmVzb3VyY2UoJ3NraWxscycpO1xuICAgIHNraWxsc1Jlc291cmNlLmFkZE1ldGhvZCgnR0VUJywgaGVsbG9JbnRlZ3JhdGlvbiwgeyBhdXRob3JpemVyIH0pO1xuXG4gICAgY29uc3QgbWFya2V0UmVzb3VyY2UgPSBhcGlWMS5hZGRSZXNvdXJjZSgnbWFya2V0Jyk7XG4gICAgbWFya2V0UmVzb3VyY2UuYWRkTWV0aG9kKCdHRVQnLCBoZWxsb0ludGVncmF0aW9uKTsgLy8gTWFya2V0IGRhdGEgaXMgcHVibGljIHJlYWRhYmxlXG5cbiAgICBjb25zdCBnYXBSZXNvdXJjZSA9IGFwaVYxLmFkZFJlc291cmNlKCdnYXAnKTtcbiAgICBnYXBSZXNvdXJjZS5hZGRNZXRob2QoJ0dFVCcsIGhlbGxvSW50ZWdyYXRpb24sIHsgYXV0aG9yaXplciB9KTtcblxuICAgIGNvbnN0IHJvYWRtYXBSZXNvdXJjZSA9IGFwaVYxLmFkZFJlc291cmNlKCdyb2FkbWFwJyk7XG4gICAgcm9hZG1hcFJlc291cmNlLmFkZE1ldGhvZCgnR0VUJywgaGVsbG9JbnRlZ3JhdGlvbiwgeyBhdXRob3JpemVyIH0pO1xuXG4gICAgY29uc3QgYWdlbnRSZXNvdXJjZSA9IGFwaVYxLmFkZFJlc291cmNlKCdhZ2VudCcpO1xuICAgIGFnZW50UmVzb3VyY2UuYWRkTWV0aG9kKCdQT1NUJywgaGVsbG9JbnRlZ3JhdGlvbiwgeyBhdXRob3JpemVyIH0pO1xuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIDcuIENMT1VERk9STUFUSU9OIFNUQUNLIE9VVFBVVFMgKFRhc2sgMi43ICYgMi44KVxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnUHVibGljSGVsbG9VcmwnLCB7XG4gICAgICB2YWx1ZTogdGhpcy5hcGkudXJsLFxuICAgICAgZGVzY3JpcHRpb246ICdQdWJsaWMgSFRUUFMgVVJMIGZvciBIZWxsbyBTa2lsbEdyYXBoIGRlcGxveW1lbnQgKFBhc3MvRmFpbCBHYXRlKScsXG4gICAgICBleHBvcnROYW1lOiAnU2tpbGxHcmFwaC1QdWJsaWNIZWxsb1VybCcsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnVXNlclBvb2xJZCcsIHtcbiAgICAgIHZhbHVlOiB0aGlzLnVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ0FXUyBDb2duaXRvIFVzZXIgUG9vbCBJRCcsXG4gICAgICBleHBvcnROYW1lOiAnU2tpbGxHcmFwaC1Vc2VyUG9vbElkJyxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdVc2VyUG9vbENsaWVudElkJywge1xuICAgICAgdmFsdWU6IHRoaXMudXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQVdTIENvZ25pdG8gVXNlciBQb29sIFdlYiBDbGllbnQgSUQnLFxuICAgICAgZXhwb3J0TmFtZTogJ1NraWxsR3JhcGgtVXNlclBvb2xDbGllbnRJZCcsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnVGFibGVOYW1lJywge1xuICAgICAgdmFsdWU6IHRoaXMudGFibGUudGFibGVOYW1lLFxuICAgICAgZGVzY3JpcHRpb246ICdEeW5hbW9EQiBTaW5nbGUtVGFibGUgTmFtZScsXG4gICAgICBleHBvcnROYW1lOiAnU2tpbGxHcmFwaC1UYWJsZU5hbWUnLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0RvY3VtZW50QnVja2V0TmFtZScsIHtcbiAgICAgIHZhbHVlOiB0aGlzLmRvY3VtZW50QnVja2V0LmJ1Y2tldE5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogJ1MzIERvY3VtZW50ICYgUmVzdW1lIEluZ2VzdGlvbiBCdWNrZXQnLFxuICAgICAgZXhwb3J0TmFtZTogJ1NraWxsR3JhcGgtRG9jdW1lbnRCdWNrZXROYW1lJyxcbiAgICB9KTtcbiAgfVxufVxuIl19