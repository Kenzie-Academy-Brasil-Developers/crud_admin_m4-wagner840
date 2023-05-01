import { QueryConfig, QueryResult } from "pg";
import { TResponseUser, TUser } from "../../interfaces/users.interface";

import { client } from "../../database";

export const deleteUsers = async (
  userId: number,
  token: number
): Promise<TResponseUser> => {
  const id = userId;
  const tokenUser = token;

  if (tokenUser !== id) {
    throw new Error("Insufficient Permission");
  }

  const queryString: string = `
    UPDATE users
    SET active = false
    WHERE id = $1
    AND active = true
    RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  const user = queryResult.rows[0];

  return user;
};
