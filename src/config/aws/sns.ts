import { SNSClient } from "@aws-sdk/client-sns";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

const sns = new SNSClient({
  region: process.env.AWS_REGION,
  credentialDefaultProvider: defaultProvider,
});

export default sns;
