import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
export const ensureAdminOrNot = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin = res.locals.token.admin;
  console.log(admin);

  if (!admin && Number(req.params.id) !== res.locals.token.id) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
