import Email, { type EmailOptions } from "email-templates";
import path from "path";
import logger from "./logger";

const email = new Email({
  message: {
    from: process.env.SENDER_EMAIL,
  },
  // i18n: {
  // },
  transport: {
    jsonTransport: true,
  },
  subjectPrefix:
    process.env.NODE_ENV === "production"
      ? false
      : `[${process.env.NODE_ENV.toUpperCase()}] `,
  views: {
    root: path.resolve("assets/emails"),
  },
});

async function send(options: EmailOptions) {
  try {
    await email.send(options);
  } catch (e) {
    logger.error(e);
  }
}

const emailClient = {
  send,
};

export type EmailClient = typeof emailClient;

export default emailClient;
