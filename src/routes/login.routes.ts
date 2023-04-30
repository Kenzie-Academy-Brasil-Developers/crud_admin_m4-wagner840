import { Router } from "express";
import { createControllerLogin } from "../controllers/login.controllers";
import { ensureBody } from "../middlewares/ensureBody.middleware";
import { reqLoginSchema } from "../schemas/login.schema";

const loginRouter = Router();

loginRouter.post("", ensureBody(reqLoginSchema), createControllerLogin);

export default loginRouter;
