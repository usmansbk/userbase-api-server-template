import redisClient, { pubsub } from "@/config/redis";
import logger from "@/utils/logger";
import i18n from "@/config/i18n";
import getPrismaClient from "@/config/database";
import type { AppContext, CurrentUser } from "types";

export default async function createMockContext(
  currentUser?: CurrentUser,
): Promise<AppContext> {
  const i18next = await i18n();
  const prismaClient = getPrismaClient();

  return {
    language: "en",
    log: logger,
    t: i18next.t,
    pubsub,
    currentUser,
    redisClient,
    prismaClient,
    storage: {
      getSignedDownloadUrl: jest.fn().mockResolvedValue("https://test.com"),
    },
    smsClient: {
      sendMessage: jest.fn(),
    },
  };
}
