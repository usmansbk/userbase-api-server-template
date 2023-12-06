import { join, resolve } from "path";
import { lstatSync, readdirSync } from "fs";
import Backend from "i18next-fs-backend";
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";

const localesDir = resolve("assets/locales");

export default async function i18n() {
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

  return i18next;
}
