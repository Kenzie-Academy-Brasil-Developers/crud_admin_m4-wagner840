import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 4000) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).send(err.flatten().fieldErrors);
  }

  console.log(err);

  return res.status(500).send({ message: "Internal server error" });
};
