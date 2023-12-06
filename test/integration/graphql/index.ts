import { ApolloServer } from "@apollo/server";
import redisClient, { pubsub } from "@/config/redis";
import schema from "@/graphql/schema";
import logger from "@/utils/logger";
import i18n from "@/config/i18n";
import getPrismaClient from "@/config/database";
import type { AppContext } from "types";

export async function createMockContext(): Promise<AppContext> {
  const i18next = await i18n();
  const prismaClient = getPrismaClient();

  return {
    language: "en",
    log: logger,
    t: i18next.t,
    currentUser: null,
    pubsub,
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

export function createMockApolloServer() {
  const server = new ApolloServer<AppContext>({
    schema,
  });

  return server;
}
