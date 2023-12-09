import { SES, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
});

export const aws = { SendEmailCommand };

export default ses;
