import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3Stack } from '../utils/S3Stack';
// import { Config } from '../utils/config';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface FileTransferCmkSecretS3StackProps extends cdk.StackProps{
    environment:string
}
export class FileTransferCmkSecretS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FileTransferCmkSecretS3StackProps) {
    super(scope, id, props);


    const essentialBucket = new S3Stack(this,"essential-bucket",{
      bucketName: "essential-bucket"
    })
  }
}
