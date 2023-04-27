import { QueryResult } from "pg";
import { TResponseUser } from "../../interfaces/users.interface";
import { client } from "../../database";
import { getAllUsersSchema } from "../../schemas/users.schemas";

export const listUsersService = async (): Promise<TResponseUser[]> => {
  const queryString: string = `SELECT * FROM users`;

  const queryResult: QueryResult<TResponseUser> = await client.query(
    queryString
  );

  const users: TResponseUser[] = getAllUsersSchema.parse(queryResult.rows);

  return users;
};
