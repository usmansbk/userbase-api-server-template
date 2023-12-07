import { generateKeys } from "@/utils/generateKeys";
import type { Request, Response } from "express";

export default function rotateKeys(req: Request, res: Response) {
  generateKeys(true);

  res.status(200).json({
    success: true,
  });
}
