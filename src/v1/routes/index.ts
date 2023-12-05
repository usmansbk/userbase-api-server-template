import express from "express";
import authMiddleware from "@/v1/middlewares/auth";
import userRouter from "./user";

const v1Router = express.Router();

v1Router.use("/user", authMiddleware(), userRouter);

export default v1Router;
