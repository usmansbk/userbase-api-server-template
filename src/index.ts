import "@/config/env";
import express from "express";
import PinoHttp from "pino-http";
import logger from "./utils/logger";

const port = 4000;
const app = express();

app.use(
  PinoHttp({
    logger,
  }),
);

app.get("/healthz", (req, res) => res.json({ success: true }));

app.get("/generate_204", (req, res) => res.status(204).json({ success: true }));

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});

export default async function main(): Promise<string> {
  return "Hello World!";
}
