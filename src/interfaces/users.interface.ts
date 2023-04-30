import { z } from "zod";
import {
  createUserResponseSchema,
  createUserSchema,
  getAllUsersSchema,
  updateUserSchema,
  usersSchema,
} from "../schemas/users.schemas";

export type TUser = z.infer<typeof usersSchema>;
export type TCreateUser = z.infer<typeof createUserSchema>;
export type TUpdateUser = z.infer<typeof updateUserSchema>;
export type TResponseUser = z.infer<typeof createUserResponseSchema>;
