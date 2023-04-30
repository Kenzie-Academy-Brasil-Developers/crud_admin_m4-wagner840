import { z } from "zod";

export const usersSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean().optional().default(false),
  active: z.boolean().default(true),
});

export const createUserSchema = usersSchema.omit({
  id: true,
});
export const createUserResponseSchema = usersSchema.omit({
  password: true,
});

export const getAllUsersSchema = z.array(createUserResponseSchema);

export const updateUserSchema = createUserSchema.partial();
