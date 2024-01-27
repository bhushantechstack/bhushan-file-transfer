#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FileTransferStack } from '../lib/file_transfer-stack';
import { FileTransferCmkSecretS3Stack } from '../lib/file-transfer-cmk-secret-s3-stack';

const app = new cdk.App();
new FileTransferStack(app, 'FileTransferStack', {
});