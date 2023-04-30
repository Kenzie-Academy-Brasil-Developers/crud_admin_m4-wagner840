import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { TResponseUser } from "../interfaces/users.interface";

const ensureUser = async (
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

  if (result.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};
export default ensureUser;
