import { mockDeep, type DeepMockProxy } from "jest-mock-extended";
import redisClient, { pubsub } from "@/config/redis";
import logger from "@/utils/logger";
import jwtClient from "@/utils/jwt";
import type { ExtendedPrismaClient } from "@/config/database";
import type { AppContext, CurrentUser } from "types";
import type { TFunction } from "i18next";

interface MockContext extends AppContext {
  mockPrismaClient: DeepMockProxy<ExtendedPrismaClient>;
}

export default async function createMockContext(
  currentUser?: CurrentUser,
): Promise<MockContext> {
  const prismaClient = mockDeep<ExtendedPrismaClient>();

  return {
    clientId: "test-client",
    sessionId: "test-session",
    jwtClient,
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
    mockPrismaClient: prismaClient,
    prismaClient,
    storage: {
      getSignedDownloadUrl: jest.fn().mockResolvedValue("https://test.com"),
    },
    smsClient: {
      sendMessage: jest.fn(),
    },
  };
}
