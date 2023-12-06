import pino from "pino";

const logger = pino({
  enabled: process.env.NODE_ENV !== "test",
});

export default logger;
