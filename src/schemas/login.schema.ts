import { z } from "zod";

export const reqLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const resLoginSchema = z.object({
  token: z.string(),
});
