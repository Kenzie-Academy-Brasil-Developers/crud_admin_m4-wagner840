import { z } from "zod";
import { reqLoginSchema, resLoginSchema } from "../schemas/login.schema";

export type TReqLogin = z.infer<typeof reqLoginSchema>;

export type TResLogin = z.infer<typeof resLoginSchema>;
