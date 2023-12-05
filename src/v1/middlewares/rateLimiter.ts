import type { Request } from "express";
import { rateLimit } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import client from "@/config/redis";
import {
  RATE_LIMITER_MAX_REQUESTS_PER_WINDOW,
  RATE_LIMITER_WINDOW_MS,
} from "@/constants/limits";

const rateLimiter = rateLimit({
  windowMs: RATE_LIMITER_WINDOW_MS,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: async (...args: string[]) => await client.call(...args),
  }),
  skip: () => process.env.NODE_ENV === "development",
  limit: async (req: Request) => RATE_LIMITER_MAX_REQUESTS_PER_WINDOW,
  message: async (req: Request) => {
    const { t } = req;

    return t("MAX_REQUESTS", {
      ns: "error",
      max: RATE_LIMITER_MAX_REQUESTS_PER_WINDOW,
      windowMs: RATE_LIMITER_WINDOW_MS,
    });
  },
});

export default rateLimiter;
