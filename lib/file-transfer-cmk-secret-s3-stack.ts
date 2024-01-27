import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3Stack } from '../utils/S3Stack';
import { fileConfig } from '../utils/fileConfig';


export interface FileTransferCmkSecretS3StackProps extends cdk.StackProps{
    envVariable:string
}
export class FileTransferCmkSecretS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FileTransferCmkSecretS3StackProps) {
    super(scope, id, props);
    const envVariable=props.envVariable

    const essentialBucket = new S3Stack(this,fileConfig.bucket.essentialBucket+envVariable,{
      bucketName: fileConfig.bucket.essentialBucket+envVariable
    })
  }
}
