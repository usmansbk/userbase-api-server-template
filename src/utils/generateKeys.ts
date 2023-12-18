import fs from "fs";
import { generateKeyPairSync } from "crypto";

export function isKeysExists() {
  return (
    fs.existsSync("certs/private.pem") && fs.existsSync("certs/public.pem")
  );
}

export function generateKeys() {
  const dir = "certs";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

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
}
