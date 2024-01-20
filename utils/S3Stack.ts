import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { aws_s3 } from "aws-cdk-lib";

interface StackProps extends cdk.StackProps{
    bucketName: string;
}
export class S3Stack extends cdk.Stack {
    
    constructor(scope: Construct, id: string, props: StackProps) {
      super(scope, id, props);

      new aws_s3.Bucket(this, props.bucketName,{
        bucketName:props.bucketName

      });
    }
  }