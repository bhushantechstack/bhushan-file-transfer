import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { FileTransferCmkSecretS3Stack } from './file-transfer-cmk-secret-s3-stack';

export class FileTransferStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fileTransferCmkSecretS3Stack = new FileTransferCmkSecretS3Stack(this,"FileTransferCmkSecretS3Stack",{
      environment: "us-east-1"
    });
  }
}
