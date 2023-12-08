import express from "express";
import authMiddleware from "../middlewares/auth";
import rotateKeys from "../controllers/auth/rotateKeys";
import refreshToken from "../controllers/auth/refreshToken";

const authRouter = express.Router();

authRouter.post(
  "/keys/rotate",
  authMiddleware([{ allow: "roles", roles: ["Admin"] }]),
  rotateKeys,
);

authRouter.post("/token/refresh", refreshToken);

export default authRouter;
