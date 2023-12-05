import "@/config/env";
import express from "express";
import PinoHttp from "pino-http";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { json } from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import logger from "./utils/logger";
import createApolloHTTPServer from "./graphql";

const port = 4000;
const app = express();

app.use(json());
app.use(cors<cors.CorsRequest>());

app.use(
  PinoHttp({
    logger,
  }),
);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
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

app.get("/healthz", (req, res) => res.json({ success: true }));

app.get("/generate_204", (req, res) => res.status(204).json({ success: true }));

app.set("trust proxy", 1);

app.get("/ip", (request, response) => response.send(request.ip));

export default async function main(): Promise<void> {
  const { httpServer, apolloServer } = await createApolloHTTPServer(app);

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => req.context,
    }),
  );

  // The error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler

  app.listen(port, () => {
    logger.info(`listening on port ${port}`);
  });

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
  });

  logger.info(`🚀 Server ready at /graphql`);
}
