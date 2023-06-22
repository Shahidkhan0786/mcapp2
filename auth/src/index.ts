import express, { Request, Response } from "express";
require("express-async-errors");
import morgan from "morgan";
const app = express();

const PORT = 3000;
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { SigninRouter } from "./routes/signin";
import { SignoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
app.use(express.json());
app.use(morgan("dev"));
app.use(signupRouter);
app.use(currentUserRouter);
app.use(SigninRouter);
app.use(SignoutRouter);
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
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
