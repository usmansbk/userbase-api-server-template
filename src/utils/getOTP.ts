import { customAlphabet } from "nanoid";

import { OTP_LENGTH } from "@/constants/limits";

interface OTPConfig {
  length?: number;
  type?: "number" | "alpha" | "alphnumeric";
}

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeric = "0123456789";

export default function getOTP(
  { length, type }: OTPConfig = { type: "number" },
) {
  let tokens = numeric;

  if (type === "alphnumeric") {
    tokens += alpha;
  } else if (type === "alpha") {
    tokens = alpha;
  }

  const nanoid = customAlphabet(tokens, OTP_LENGTH);

  return nanoid(length);
}
