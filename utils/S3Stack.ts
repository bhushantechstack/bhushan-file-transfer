import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { aws_s3 } from "aws-cdk-lib";

export interface S3Props extends cdk.StackProps{
    bucketName: string;
}
export class S3Stack extends cdk.Stack {
    
    constructor(scope: Construct, id: string, props: S3Props) {
      super(scope, id, props);

      new aws_s3.Bucket(this, props.bucketName,{
        bucketName:props.bucketName

      });
    }
  }