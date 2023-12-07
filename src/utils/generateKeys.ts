import fs from "fs";
import { generateKeyPairSync } from "crypto";
import log from "@/utils/logger";

export function generateKeys(rotate = false) {
  const dir = "certs";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (
    rotate ||
    !(fs.existsSync("certs/private.pem") && fs.existsSync("certs/public.pem"))
  ) {
    log.info("Generating key pair");
    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });
    fs.writeFileSync(
      "certs/private.pem",
      privateKey.export({ type: "pkcs1", format: "pem" }),
    );
    fs.writeFileSync(
      "certs/public.pem",
      publicKey.export({ type: "spki", format: "pem" }),
    );
    log.info("Key pair generated");
  }
}
