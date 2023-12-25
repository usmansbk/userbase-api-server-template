import express from "express";

import refreshToken from "../controllers/auth/refreshToken";

const authRouter = express.Router();

authRouter.post("/token/refresh", refreshToken);

export default authRouter;
