import * as cdk from 'aws-cdk-lib';

export default interface AppProps extends cdk.StackProps{
    project: string,
    stage:  string,
    pillowLayer: string,
}
