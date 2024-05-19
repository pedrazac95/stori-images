#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StoriImagesStack } from '../lib/stori-images-stack';

const app = new cdk.App();
new StoriImagesStack(app, 'StoriImagesStack', {
    stage: 'dev',
    project: 'stori',
    pillowLayer: 'arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p310-Pillow:7'
}
);