import * as cdk from 'aws-cdk-lib';
import { S3 } from 'aws-cdk-lib/aws-ses-actions';
import { Construct } from 'constructs';
import { aws_s3 as s3, aws_lambda as lambda, aws_iam } from 'aws-cdk-lib';
import { Tags, aws_iam as iam } from 'aws-cdk-lib';
import AppProps from '../interfaces/app-props';
import { Code } from 'aws-cdk-lib/aws-lambda';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';


export class StoriImagesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppProps) {
    super(scope, id, props);

    const uplaodBucket = new  s3.Bucket(this, 'uploadBucket', {
      bucketName: `upload-bucket-${props?.project}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const processedBucket = new  s3.Bucket(this, 'processedBucket', {
      bucketName: `processed-bucket-${props?.project}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const lambdaRole = new iam.Role(this, 'lambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')]
    });

    const pillowLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'pillowLayer', props.pillowLayer);

    const lambdaFunction  = new lambda.Function(this, 'lambdaFunction', {
      functionName: `lambda-function-${props?.project}`,
      runtime: lambda.Runtime.PYTHON_3_10,
      code: Code.fromAsset('src/'),
      handler: 'lambda_function.lambda_handler',
      environment: {
        UPLOAD_BUCKET: uplaodBucket.bucketName,
        PROCESSED_BUCKET: processedBucket.bucketName
      },
      timeout: cdk.Duration.seconds(300),
      memorySize: 3008,
      role: lambdaRole,
      layers: [pillowLayer]
    });

    uplaodBucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(lambdaFunction))
  }
}
