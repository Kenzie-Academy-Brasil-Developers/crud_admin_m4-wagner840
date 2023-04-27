import { TUpdateUser } from "../../interfaces/users.interface";
import { QueryConfig } from "pg";
import { client } from "../../database";
import format from "pg-format";
import { createUserResponseSchema } from "../../schemas/users.schemas";

export const updateUser = async (userId: number, payload: TUpdateUser) => {
  const queryFormat = format(
    `UPDATE users SET (%I) = ROW (%L) WHERE id = $1 RETURNING *`,

    Object.keys(payload),
    Object.values(payload)
  );
  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [userId],
  };

  const queryResult = await client.query(queryConfig);

  const updatedUser = createUserResponseSchema.parse(queryResult.rows[0]);

  return updatedUser;
};
