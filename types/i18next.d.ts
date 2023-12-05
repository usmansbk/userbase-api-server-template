import "i18next";
import type translation from "assets/locales/en/translation.json";
import type error from "assets/locales/en/error.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translation;
      error: typeof error;
    };
  }
}
