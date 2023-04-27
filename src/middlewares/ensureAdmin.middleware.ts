import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin = res.locals.token.admin;
  console.log(admin);

  if (admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
