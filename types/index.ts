import type pino from "pino";
import type { TFunction } from "i18next";
import type { RedisPubSub } from "graphql-redis-subscriptions";
import type { SMSClient } from "@/utils/sms";
import type { Storage } from "@/utils/storage";
import type { Redis } from "ioredis";
import type { ExtendedPrismaClient } from "@/config/database";
import type { AccountStatus, UserSession } from "./graphql";
import type { JWTClient } from "@/utils/jwt";
import type { EmailClient } from "@/utils/email";

export interface UserSessions {
  [key: string]: UserSession;
}

export interface CurrentUser {
  id: string;
  status: AccountStatus;
  language: string | null;
  roles: string[];
  permissions: string[];
  sessions: UserSessions;
}

export interface AppContext {
  sessionId?: string;
  clientId?: string;
  log: pino.Logger<pino.LoggerOptions>;
  currentUser?: CurrentUser | null;
  t: TFunction<"translation" | "error", undefined>;
  prismaClient: ExtendedPrismaClient;
  redisClient: Redis;
  emailClient: EmailClient;
  smsClient: SMSClient;
  jwtClient: JWTClient;
  pubsub: RedisPubSub;
  language: string;
  storage: Storage;
}

declare global {
  namespace Express {
    namespace MulterS3 {
      export interface File extends Multer.File {
        bucket: string;
        key: string;
        acl: string;
        contentType: string;
        contentDisposition: null;
        storageClass: string;
        serverSideEncryption: null;
        metadata: JSON;
        location: string;
        etag: string;
      }
    }

    export interface Request {
      context: AppContext;
      file?: MulterS3.File | undefined;
      files?:
        | {
            [fieldname: string]: MulterS3.File[];
          }
        | MulterS3.File[]
        | undefined;
    }
  }
}

export default {};
