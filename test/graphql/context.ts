import redisClient, { pubsub } from "@/config/redis";
import log from "@/utils/logger";
import jwtClient from "@/utils/jwt";
import prismaClient from "@/config/database";
import type { AppContext, CurrentUser } from "types";
import type { TFunction } from "i18next";

export default async function createMockContext(
  currentUser?: CurrentUser,
): Promise<AppContext> {
  return {
    log,
    pubsub,
    jwtClient,
    redisClient,
    currentUser,
    language: "en",
    clientIp: "test",
    clientId: "test",
    userAgent: "test",
    prismaClient,
    t: jest
      .fn()
      .mockImplementation(
        (key: string) => key,
      ) as unknown as TFunction<"translation">,
    docClient: {
      putItem: jest.fn(),
      putMany: jest.fn(),
      query: jest.fn(),
    },
    storage: {
      deleteObject: jest.fn(),
      deleteManyObjects: jest.fn(),
      getSignedDownloadUrl: jest.fn().mockResolvedValue("https://test.com"),
    },
    smsClient: {
      sendMessage: jest.fn(),
    },
    emailClient: {
      send: jest.fn(),
    },
  };
}
