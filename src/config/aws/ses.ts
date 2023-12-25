import { SendRawEmailCommand, SES } from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

const ses = new SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
  credentialDefaultProvider: defaultProvider,
});

export const aws = { SendRawEmailCommand };

export default ses;
