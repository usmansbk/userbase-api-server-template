import type { Express } from "express";
import { lstatSync, readdirSync } from "fs";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import { join, resolve } from "path";

const localesDir = resolve("assets/locales");

async function initializeI18n(app: Express) {
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

  app.use(i18nextMiddleware.handle(i18next));

  return i18next;
}

export { i18nextMiddleware, initializeI18n };

export default i18next;
