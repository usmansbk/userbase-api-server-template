import sns from "@/config/aws/sns";
import logger from "./logger";
import { PublishCommand } from "@aws-sdk/client-sns";

interface Message {
  phoneNumber: string; // E.164 Format
  text: string; // 140 characters
  subject?: string;
}

async function sendMessage(message: Message) {
  const { text, subject, phoneNumber } = message;
  if (process.env.NODE_ENV === "production") {
    try {
      const result = await sns.send(
        new PublishCommand({
          Message: text,
          PhoneNumber: phoneNumber,
          Subject: subject,
        }),
      );
      logger.info(result);
    } catch (e) {
      logger.error(e);
    }
  } else {
    logger.info(message);
  }
}

const smsClient = {
  sendMessage,
};

export type SMSClient = typeof smsClient;

export default smsClient;
