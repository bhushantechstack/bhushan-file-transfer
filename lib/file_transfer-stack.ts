import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { FileTransferCmkSecretS3Stack } from './file-transfer-cmk-secret-s3-stack';

export class FileTransferStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new cdk.aws_s3.Bucket(this,"bhushang-bucket",{
    //   bucketName:"bhushang-bucket-dev",
      
    // })
    new FileTransferCmkSecretS3Stack(this,"file-transfer-stack",{
      envVariable: "dev"
    });

    //this is testing if this bucket give already exit or not things
  }
}
