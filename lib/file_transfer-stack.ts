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
      }
    );

    const assetBucket = new cdk.aws_s3.Bucket(
      this,
      fileConfig.bucket.assetBucket + this.envVariable,
      {
        bucketName: fileConfig.bucket.assetBucket + this.envVariable,
      }
    );
  }
}
