import express from "express";

import authMiddleware from "@/v1/middlewares/auth";

import authRouter from "./auth";
import userRouter from "./user";

const v1Router = express.Router();

v1Router.use("/user", authMiddleware(), userRouter);
v1Router.use("/auth", authRouter);

export default v1Router;
