import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { fileConfig } from "../utils/fileConfig";
import { aws_glue } from "aws-cdk-lib";
import path = require("path");
import { LambdaApplication } from "aws-cdk-lib/aws-codedeploy";

export class FileTransferStack extends cdk.Stack {
  envVariable: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.envVariable = "dev";
    //essential bucket
    const veryInputBucket = new cdk.aws_s3.Bucket(
      this,
      fileConfig.bucket.essentialBucket + this.envVariable,
      {
        bucketName: fileConfig.bucket.essentialBucket + this.envVariable,
        versioned: true,
      }
    );

    //glue script deployment
    new cdk.aws_s3_deployment.BucketDeployment(this, "GlueScriptDeployment", {
      sources: [cdk.aws_s3_deployment.Source.asset("utils/glue-script/")],
      destinationBucket: veryInputBucket,
      destinationKeyPrefix: "scripts", // Destination folder in the S3 bucket
    });

    //lambda script deployment
    new cdk.aws_s3_deployment.BucketDeployment(this, "LambdaScriptDeployment", {
      sources: [cdk.aws_s3_deployment.Source.asset("utils/lambda/")],
      destinationBucket: veryInputBucket,
      destinationKeyPrefix: "lambda-scripts", // Destination folder in the S3 bucket
    });

    // data bucket
    const veryOutputBucket = new cdk.aws_s3.Bucket(
      this,
      fileConfig.bucket.dataBucket + this.envVariable,
      {
        bucketName: fileConfig.bucket.dataBucket + this.envVariable,
        versioned: true,
      }
    );

    //glue job to run script
    const essential_glue_job = new aws_glue.CfnJob(
      this,
      fileConfig.glue.jobName + this.envVariable,
      {
        command: {
          name: "glueetl",
          scriptLocation:
            "s3://" +
            fileConfig.bucket.essentialBucket +
            this.envVariable +
            "/scripts/lambda-script.py",
        },
        role: veryInputBucket.bucketArn,
        description: fileConfig.glue.description,
        glueVersion: "4.0",
        numberOfWorkers: 299,
        workerType: "G.1X",
      }
    );

    //adding lambda to test sns topic
    const sns_invoke = new cdk.aws_lambda.Function(this, "Function", {
      functionName: fileConfig.lambda.functionName,
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: "lambda.lambda_handler",
      code: cdk.aws_lambda.Code.fromAsset("utils/lambda/"),
    });

    //ssn to send notifications

    const sns = new cdk.aws_sns.CfnTopic(this, "Your-topc", {
      topicName: fileConfig.sns.topic,
      displayName: fileConfig.sns.topic,
    });

    
  }
}
