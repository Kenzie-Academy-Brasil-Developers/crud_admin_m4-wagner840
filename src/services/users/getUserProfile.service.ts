import { QueryConfig, QueryResult } from "pg";
import { TResponseUser } from "../../interfaces/users.interface";
import { client } from "../../database";
import { createUserResponseSchema } from "../../schemas/users.schemas";

export const listUserProfile = async (
  userId: number
): Promise<TResponseUser> => {
  const id: number = Number(userId);

  const queryString: string = `
    SELECT * FROM users
    WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TResponseUser> = await client.query(
    queryConfig
  );

  const user: TResponseUser = createUserResponseSchema.parse(
    queryResult.rows[0]
  );

  return user;
};
