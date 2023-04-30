import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";

export const ensureToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    String(process.env.SECRET_KEY),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }
      res.locals.token = {
        id: parseInt(decoded.sub),
        admin: decoded.admin,
      };
    }
  );

  return next();
};
