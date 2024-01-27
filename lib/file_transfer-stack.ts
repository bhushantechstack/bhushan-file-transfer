import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { fileConfig } from "../utils/fileConfig";
export class FileTransferStack extends cdk.Stack {
  envVariable: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.envVariable = "dev";

    const essentialBucket = new cdk.aws_s3.Bucket(
      this,
      fileConfig.bucket.essentialBucket + this.envVariable,
      {
        bucketName: fileConfig.bucket.essentialBucket + this.envVariable,
        versioned:true
      }
    );

    const dataBucket = new cdk.aws_s3.Bucket(
      this,
      fileConfig.bucket.dataBucket + this.envVariable,
      {
        bucketName: fileConfig.bucket.dataBucket + this.envVariable,
        versioned:true
      }
    );
  }
}
