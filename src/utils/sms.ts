import sns from "@/config/aws/sns";
import logger from "./logger";
import { PublishCommand } from "@aws-sdk/client-sns";

interface Message {
  to: string;
  text: string;
  subject?: string;
}

async function sendMessage(message: Message) {
  const { text, subject, to } = message;
  try {
    const result = await sns.send(
      new PublishCommand({
        Message: text,
        PhoneNumber: to,
        Subject: subject,
      }),
    );
    logger.info(result);
  } catch (e) {
    logger.error(e);
  }
}

const smsClient = {
  sendMessage,
};

export type SMSClient = typeof smsClient;

export default smsClient;
