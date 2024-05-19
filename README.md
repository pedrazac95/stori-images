# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


# TO IMPROVE
AWS Lambda functions can experience cold start latency, particularly if they have not been invoked for a while. This can lead to delays when the function is triggered by a new image upload, which might be noticeable if immediate processing is expected.

Lambda has limits on the amount of memory and CPU resources that can be allocated to a function. For very large images or computationally intensive processing, these limits might be restrictive.

There are limits on the number of concurrent Lambda function executions. Exceeding these limits can result in throttling and delays in processing.

While Lambda is cost-effective for intermittent workloads, if the function is invoked very frequently or processes large amounts of data, costs can escalate quickly. Similarly, storage costs in S3 can accumulate if the number of images and generated thumbnails grows significantly.

Using AWS services like Lambda and S3 tightly integrates your solution with the AWS ecosystem. This can make it difficult to migrate to other cloud providers or on-premises solutions without significant re-engineering.

If the S3 buckets and the Lambda function are not in the same AWS region, data transfer latency can increase, affecting the performance of the thumbnail generation process.

# STRENGTHS
AWS Lambda automatically scales the number of executions in response to the volume of incoming events. This means that the system can handle a varying number of image uploads without manual intervention or capacity planning.

Lambda operates on a pay-as-you-go model, charging only for the compute time consumed. When the function is not running, there are no charges. This can be much more cost-effective than maintaining a dedicated server or virtual machine for the same task.

S3’s event notification feature allows for a clean and simple way to trigger the Lambda function. When a new image is uploaded, S3 sends an event to Lambda to start the thumbnail generation.

There is no need to manage servers or worry about uptime. AWS handles all the infrastructure concerns, allowing you to focus on the code and functionality.

AWS Lambda and S3 are highly available services with built-in redundancy. This ensures that the thumbnail generation process is reliable and resilient to failures.

Lambda functions typically start within milliseconds, which means the thumbnail generation can be very responsive.

AWS CloudWatch can be used to monitor Lambda function executions and log any errors or performance metrics, providing visibility into the operation of the system.
