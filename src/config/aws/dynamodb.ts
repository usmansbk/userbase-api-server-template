import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentialDefaultProvider: defaultProvider,
});

export default DynamoDBDocumentClient.from(client);
