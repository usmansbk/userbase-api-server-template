import logger from "./logger";

interface Message {
  to: string;
  from: string;
  body: string;
}

function sendMessage(message: Message) {
  logger.info(message);
}

const sms = {
  sendMessage,
};

export type SMS = typeof sms;

export default sms;
