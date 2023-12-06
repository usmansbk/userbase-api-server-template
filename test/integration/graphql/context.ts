import redisClient, { pubsub } from "@/config/redis";
import logger from "@/utils/logger";
import getPrismaClient from "@/config/database";
import type { AppContext, CurrentUser } from "types";
import type { TFunction } from "i18next";

export default async function createMockContext(
  currentUser?: CurrentUser,
): Promise<AppContext> {
  const prismaClient = getPrismaClient();

  return {
    language: "en",
    log: logger,
    t: jest
      .fn()
      .mockImplementation(
        (key: string) => key,
      ) as unknown as TFunction<"translation">,
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
