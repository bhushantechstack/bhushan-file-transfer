import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { fileConfig } from "../utils/fileConfig";
import { aws_glue } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";

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
    
    
    new cdk.aws_s3_deployment.BucketDeployment(this, 'GlueScriptDeployment', {
      sources: [cdk.aws_s3_deployment.Source.asset("utils/glue-script/")],
      destinationBucket: veryInputBucket,
      destinationKeyPrefix: 'scripts', // Destination folder in the S3 bucket
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
          scriptLocation: "s3://"+fileConfig.bucket.essentialBucket+this.envVariable+"/scripts/lambda-script.py",
        },
        role: veryInputBucket.bucketArn,
        description: fileConfig.glue.description,
        glueVersion: "4.0",
        numberOfWorkers: 299,
        workerType: "G.1X",
        
      }
    );

  }
}
