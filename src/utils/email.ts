import Email, { type EmailOptions } from "email-templates";
import nodemailer from "nodemailer";
import path from "path";

import ses, { aws } from "@/config/aws/ses";
import Sentry from "@/config/sentry";

import logger from "./logger";

const transporter = nodemailer.createTransport({
  SES: { aws, ses },
});

const isProd = process.env.NODE_ENV === "production";

const email = new Email({
  message: {
    from: process.env.SENDER_EMAIL,
  },
  i18n: {
    locales: ["en"],
    directory: path.resolve("assets/emails/locales"),
  },
  send: true,
  transport: isProd
    ? transporter
    : {
        jsonTransport: true,
      },
  subjectPrefix: isProd ? false : `[${process.env.NODE_ENV.toUpperCase()}] `,
  views: {
    root: path.resolve("assets/emails/templates"),
  },
});

async function send(options: EmailOptions) {
  try {
    if (process.env.NODE === "development") {
      logger.info(options);
    }
    const result = await email.send(options);
    logger.info(result);
  } catch (e) {
    logger.error(e);
    Sentry.captureException(e);
  }
}

const emailClient = {
  send,
};

export type EmailClient = typeof emailClient;

export default emailClient;
