import { QueryConfig, QueryResult } from "pg";
import { TResponseUser, TUser } from "../../interfaces/users.interface";
import { createUserResponseSchema } from "../../schemas/users.schemas";
import { client } from "../../database";

export const updateUserService = async (
  userId: number
): Promise<TResponseUser> => {
  const id: number = Number(userId);

  const queryString: string = `
    UPDATE users
    SET active = true
    WHERE id = $1
    AND active = false
    RETURNING *;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  const user = queryResult.rows[0];

  return createUserResponseSchema.parse(user);
};
