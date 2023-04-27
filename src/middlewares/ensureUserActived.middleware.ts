import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { TResponseUser } from "../interfaces/users.interface";
import { client } from "../database";
import { AppError } from "../error";

export const ensureUserIsActived = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `SELECT * FROM users WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const result: QueryResult<TResponseUser> = await client.query(queryConfig);

  const user = result.rows[0];

  if (user.active === true) {
    throw new AppError("User already actived", 400);
  }

  return next();
};
