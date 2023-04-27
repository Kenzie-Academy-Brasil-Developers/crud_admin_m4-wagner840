import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../error";

export const ensureEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (req.method === "PATCH" && !req.body.email) {
    return next();
  }
  const queryString: string = `SELECT * FROM users WHERE email = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const result = await client.query(queryConfig);

  if (result.rowCount !== 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};
