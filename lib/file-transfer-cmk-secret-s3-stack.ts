import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3Stack } from '../utils/S3Stack';
import { fileConfig } from '../utils/config';


interface FileTransferCmkSecretS3StackProps extends cdk.StackProps{
    environment:string
}
export class FileTransferCmkSecretS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FileTransferCmkSecretS3StackProps) {
    super(scope, id, props);
    const env=this.environment

    const essentialBucket = new  S3Stack(this,fileConfig.bucket.resourceId+env,{
      bucketName: fileConfig.bucket.essentialBucket+env
    })
  }
}
