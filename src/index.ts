import "@/config/env";
import express from "express";
import PinoHttp from "pino-http";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { json } from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import i18nextMiddleware from "i18next-http-middleware";
import { join, resolve } from "path";
import { lstatSync, readdirSync } from "fs";
import Backend from "i18next-fs-backend";
import i18next from "i18next";
import logger from "./utils/logger";
import createApolloHTTPServer from "./graphql";
import rateLimiter from "./v1/middlewares/rateLimiter";
import v1Router from "./v1/routes";
import errorHandler from "./v1/middlewares/errorHandler";
import appContext from "./v1/middlewares/appContext";
import { generateKeys } from "./utils/generateKeys";

const localesDir = resolve("assets/locales");

async function main() {
  generateKeys();

  await i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      initImmediate: false,
      fallbackLng: "en",
      ns: ["translation", "error"],
      defaultNS: "translation",
      preload: readdirSync(localesDir).filter((fileName) => {
        const joinedPath = join(localesDir, fileName);
        return lstatSync(joinedPath).isDirectory();
      }),
      backend: {
        loadPath: join(localesDir, "{{lng}}/{{ns}}.json"),
      },
      interpolation: {
        skipOnVariables: false,
      },
    });

  const app = express();

  app.use(i18nextMiddleware.handle(i18next));

  app.use(json());
  app.use(cors<cors.CorsRequest>());
  app.use(
    PinoHttp({
      logger,
    }),
  );

  // https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues
  app.set("trust proxy", 1);

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.NODE_ENV === "production",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  app.use(appContext);
  app.use(rateLimiter); // Rate limiter depends on Context

  app.get("/healthz", (req, res) => res.json({ success: true }));

  app.get("/generate_204", (req, res) =>
    res.status(204).json({ success: true }),
  );

  app.get("/ip", (request, response) => response.send(request.ip));

  const { httpServer, apolloServer } = await createApolloHTTPServer(app);

  app.use("/v1", v1Router);
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => req.context,
    }),
  );

  // The error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler
  app.use(errorHandler);

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
    logger.info(`🚀 Server ready at /graphql`);
  });
}

main().catch((e) => {
  logger.error(e as Error);
});
