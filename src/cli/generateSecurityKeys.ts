import consola from "consola";

import { generateKeys, isKeysExists } from "@/utils/generateKeys";

export default async function generateSecurityKeys() {
  consola.start("Generating security keys...");
  const hasKeys = isKeysExists();

  if (hasKeys) {
    const confirmed = await consola.prompt("Delete existing keys?", {
      type: "confirm",
    });

    if (!confirmed) {
      consola.success("Using current security keys.");
      return;
    }
  }
  generateKeys();

  consola.success("Security keys generated!");
}
