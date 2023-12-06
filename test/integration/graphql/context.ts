import redisClient, { pubsub } from "@/config/redis";
import logger from "@/utils/logger";
import i18n from "@/config/i18n";
import getPrismaClient from "@/config/database";
import type { AppContext } from "types";

export default async function createMockContext(): Promise<AppContext> {
  const i18next = await i18n();
  const prismaClient = getPrismaClient();

  return {
    language: "en",
    log: logger,
    t: i18next.t,
    pubsub,
    redisClient,
    prismaClient,
    currentUser: null,
    storage: {
      getSignedDownloadUrl: jest.fn().mockResolvedValue("https://test.com"),
    },
    smsClient: {
      sendMessage: jest.fn(),
    },
  };
}
