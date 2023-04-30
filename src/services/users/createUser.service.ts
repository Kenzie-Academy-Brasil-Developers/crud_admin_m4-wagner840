import { hash } from "bcryptjs";
import {
  TCreateUser,
  TResponseUser,
  TUser,
} from "../../interfaces/users.interface";

import { QueryResult } from "pg";
import * as bcrypt from "bcryptjs";

import format from "pg-format";
import { client } from "../../database";
import { createUserResponseSchema } from "../../schemas/users.schemas";

const createUserService = async (payload: TCreateUser) => {
  const hashPassword: string = await bcrypt.hash(payload.password, 10);
  payload.password = hashPassword;
  const queryString: string = format(
    `INSERT INTO users (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const newUser: TResponseUser = createUserResponseSchema.parse(
    queryResult.rows[0]
  );
  return newUser;
};

export default createUserService;
