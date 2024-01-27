import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3Stack } from '../utils/S3Stack';

export class FileTransferStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new S3Stack(this,"bhushanbhai",{
      bucketName:"bhushanbhai"
    })
  }
}
