import express, { Request, Response } from "express";
require("express-async-errors");
import morgan from "morgan";
const app = express();
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/currentUser";
import { signupRouter } from "./routes/signup";
import { SigninRouter } from "./routes/signin";
import { SignoutRouter } from "./routes/signout";
import { errorHandler } from "@shahidorg/common";
import { NotFoundError } from "@shahidorg/common";

app.use(express.json());
app.set("trust proxy", true);
app.use(morgan("dev"));
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
    secure: false,
    // name: 'session',
    // keys: [/* secret keys */],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(SigninRouter);
app.use(SignoutRouter);
app.get("/test", (req, res, next) => {
  return res.json("App is running");
});
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
