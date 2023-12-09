import { S3Client } from "@aws-sdk/client-s3";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentialDefaultProvider: defaultProvider,
});

export default s3;
