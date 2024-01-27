import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { fileConfig } from '../utils/fileConfig';
export class FileTransferStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk.aws_s3.Bucket(this, fileConfig.bucket.essentialBucket+"dev",{
      bucketName:fileConfig.bucket.essentialBucket+"dev"

    });
  }
}
