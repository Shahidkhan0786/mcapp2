import express, { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("something went wrong", err);
  if (err instanceof RequestValidationError) {
    console.log("req validation error");
    const formatederror = err.errors.map((error) => {
      return { message: error.msg, field: error.type };
    });

    return res.status(400).send({ errors: formatederror });
  }
  if (err instanceof DatabaseConnectionError) {
    console.log("db connection  error");
  }
  res.status(400).send({
    message: err.message,
  });
};
