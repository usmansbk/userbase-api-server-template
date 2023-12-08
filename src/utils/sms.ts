import logger from "./logger";

interface Message {
  to: string;
  from: string;
  body: string;
}

function sendMessage(message: Message) {
  logger.info(message);
}

const smsClient = {
  sendMessage,
};

export type SMS = typeof smsClient;

export default smsClient;
