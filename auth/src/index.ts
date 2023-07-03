import express, { Request, Response } from "express";
require("express-async-errors");
import morgan from "morgan";
const app = express();
import cookieSession from "cookie-session";
const PORT = 3000;
import { currentUserRouter } from "./routes/currentUser";
import { signupRouter } from "./routes/signup";
import { SigninRouter } from "./routes/signin";
import { SignoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
app.use(express.json());
app.set("trust proxy", true);
app.use(morgan("dev"));
app.use(
  cookieSession({
    signed: false,
    secure: true,
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

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Jwt_Key Must Be define");
  }
  try {
    await mongoose
      .connect("mongodb://auth-mongo-srv:27017/auth")
      .then(() => {
        console.log("Connected DB Successfully");
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
app.listen(PORT, () => {
  console.log(`auth service up and running on port ${PORT}`);
});
