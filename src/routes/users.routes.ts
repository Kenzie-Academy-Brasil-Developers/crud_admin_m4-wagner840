import { Router } from "express";
import {
  createUser,
  softDeleteController,
  updateActiveUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { listUsersService } from "../services/users/listUsers.service";
import { listUserProfile } from "../services/users/getUserProfile.service";
import ensureBody from "../middlewares/ensureBody.middleware";
import ensureEmail from "../middlewares/ensureEmail.middleware";
import ensureAdmin from "../middlewares/ensureAdmin.middleware";
import ensureToken from "../middlewares/ensureToken.middleware";
import ensureUser from "../middlewares/ensureUser.middleware";
const userRoutes: Router = Router();

userRoutes.post("", ensureBody(createUserSchema), ensureEmail, createUser);

userRoutes.get("", ensureToken, ensureAdmin, listUsersService);

userRoutes.get("/:profile", ensureToken, listUserProfile);

userRoutes.patch(
  "/:id",
  ensureToken,
  ensureUser,
  ensureAdmin,
  ensureBody(updateUserSchema),
  ensureEmail,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureToken,
  ensureUser,
  ensureAdmin,
  softDeleteController
);

userRoutes.put(
  "/:id/recover",
  ensureToken,
  ensureAdmin,
  ensureUser,
  updateActiveUserController
);

export default userRoutes;
