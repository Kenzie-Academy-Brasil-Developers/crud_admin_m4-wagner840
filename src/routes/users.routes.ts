import { Router } from "express";
import {
  createUser,
  getUserProfile,
  getUsers,
  softDeleteController,
  updateActiveUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { ensureBody } from "../middlewares/ensureBody.middleware";
import { ensureEmail } from "../middlewares/ensureEmail.middleware";
import { ensureAdmin } from "../middlewares/ensureAdmin.middleware";
import { ensureToken } from "../middlewares/ensureToken.middleware";
import { ensureUser } from "../middlewares/ensureUser.middleware";
import { ensureUserIsActived } from "../middlewares/ensureUserActived.middleware";
import { ensureAdminOrNot } from "../middlewares/ensureAdmOrNot.middleware";

const userRoutes: Router = Router();

userRoutes.post("", ensureBody(createUserSchema), ensureEmail, createUser);

userRoutes.get("", ensureToken, ensureAdmin, getUsers);

userRoutes.get("/:profile", ensureToken, getUserProfile);

userRoutes.patch(
  "/:id",
  ensureToken,
  ensureUser,
  ensureAdminOrNot,
  ensureBody(updateUserSchema),
  ensureEmail,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureToken,
  ensureUser,
  ensureAdminOrNot,
  softDeleteController
);

userRoutes.put(
  "/:id/recover",
  ensureToken,
  ensureAdmin,
  ensureUserIsActived,
  updateActiveUserController
);

export default userRoutes;
