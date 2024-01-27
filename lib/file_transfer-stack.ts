import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { fileConfig } from "../utils/fileConfig";
import { aws_glue } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Role } from "aws-cdk-lib/aws-iam";
export class FileTransferStack extends cdk.Stack {
  envVariable: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.envVariable = "dev";
    //essential bucket
    const essentialBucket = new cdk.aws_s3.Bucket(
      this,
      fileConfig.bucket.essentialBucket + this.envVariable,
      {
        bucketName: fileConfig.bucket.essentialBucket + this.envVariable,
        versioned: true,
      }
    );

    // data bucket
    const dataBucket = new cdk.aws_s3.Bucket(
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
          pythonVersion: "3.9",
          scriptLocation: "../utils/glue-script/lambda-script.py",
        },
        role: essentialBucket.bucketArn,
        description: fileConfig.glue.description,
        glueVersion: "4.0",
        numberOfWorkers: 299,
        workerType: "G.1X",
      }
    );
  }
}
