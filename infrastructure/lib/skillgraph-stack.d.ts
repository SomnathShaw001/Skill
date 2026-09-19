import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
export declare class SkillGraphStack extends cdk.Stack {
    readonly userPool: cognito.UserPool;
    readonly userPoolClient: cognito.UserPoolClient;
    readonly api: apigateway.RestApi;
    readonly table: dynamodb.Table;
    readonly documentBucket: s3.Bucket;
    readonly helloFunction: nodejs.NodejsFunction;
    constructor(scope: Construct, id: string, idProps?: cdk.StackProps);
}
