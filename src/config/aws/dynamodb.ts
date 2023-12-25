import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentialDefaultProvider: defaultProvider,
});

export default DynamoDBDocumentClient.from(client);
