declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      APP_DOMAIN: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_URL: string;
      SENTRY_DSN: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_PASSWORD: string;
      DB_USER: string;
      DATABASE: string;
      DATABASE_URL: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      AWS_S3_BUCKET: string;
      AWS_DYNAMODB_TABLE: string;
      CLOUDFRONT_API_ENDPOINT: string;
      SENDER_EMAIL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      UNIVERSAL_LINK: string;
    }
  }
}

declare module "http" {
  export interface IncomingHttpHeaders {
    access_token?: string;
    refresh_token?: string;
    client_id: string;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
