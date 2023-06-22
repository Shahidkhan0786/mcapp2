import express, { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { CustomError } from "../errors/custom-error";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("something went wrong", err);
  if (err instanceof CustomError) {
    console.log("req validation error");

    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [
      {
        message: err.message,
      },
    ],
  });
};
