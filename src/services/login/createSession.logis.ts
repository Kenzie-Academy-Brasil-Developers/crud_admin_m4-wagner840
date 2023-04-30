import { QueryResult } from "pg";
import { TReqLogin } from "../../interfaces/login.interface";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TUser } from "../../interfaces/users.interface";
import { client } from "../../database";
import { AppError } from "../../error";

export const createSessionLogin = async (
  payload: TReqLogin
): Promise<string> => {
  const queryString: string = `
    SELECT * FROM users WHERE email = $1`;

  const queryResult: QueryResult<TUser> = await client.query(queryString, [
    payload.email,
  ]);
  const user: TUser = queryResult.rows[0];

  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  if (!user.active) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword: boolean = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY!,
    {
      subject: user.id.toString(),
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return token;
};
