import consola from "consola";
import { generateKeys } from "@/utils/generateKeys";

export default function createSecurityKeys() {
  consola.start("Generating security keys...");
  generateKeys(true);
  consola.success("Security keys generated!");
}
