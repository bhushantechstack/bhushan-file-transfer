import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { fileConfig } from '../utils/fileConfig';
import { S3Stack } from '../utils/S3Stack';

export interface FileTransferProps extends cdk.StackProps{
  envVariable:string
}
export class FileTransferStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FileTransferProps) {
    super(scope, id, props);
    const envVariable=props.envVariable;

    const essentialBucket = new S3Stack(this,fileConfig.bucket.resourceId+envVariable,{
      bucketName: fileConfig.bucket.essentialBucket+envVariable
    })
  }
}
