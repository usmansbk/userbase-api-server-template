import Email, { type EmailOptions } from "email-templates";
import nodemailer from "nodemailer";
import path from "path";
import ses, { aws } from "@/config/aws/ses";
import Sentry from "@/config/sentry";
import logger from "./logger";

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
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
  transport: isProd
    ? transporter
    : {
        jsonTransport: true,
      },
  subjectPrefix: isProd ? false : `[${process.env.NODE_ENV.toUpperCase()}] `,
  views: {
    root: path.resolve("assets/emails"),
  },
});

async function send(options: EmailOptions) {
  try {
    await email.send(options);
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
