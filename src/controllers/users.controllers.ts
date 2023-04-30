import { Request, Response } from "express";
import { TUser } from "../__tests__/mocks/interfaces";
import {
  TCreateUser,
  TResponseUser,
  TUpdateUser,
} from "../interfaces/users.interface";
import createUserService from "../services/users/createUser.service";
import { listUserProfile } from "../services/users/getUserProfile.service";
import { listUsersService } from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/updateActiveUser.service";
import { updateUser } from "../services/users/updateUsers.service";
import { deleteUsers } from "../services/users/deleteUsers.service";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TCreateUser = req.body;

  const newUser: TResponseUser = await createUserService(payload);

  return res.status(201).send(newUser);
};
export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TResponseUser[] = await listUsersService();
  return res.status(200).send(users);
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.token.id;
  console.log(id);
  const data: TResponseUser = await listUserProfile(id);

  return res.send(data);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const data: TUpdateUser = req.body;

  const updatedUser: TResponseUser = await updateUser(id, data);

  return res.status(200).send(updatedUser);
};

export const softDeleteController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const token: number = res.locals.token.id;

  const userData = await deleteUsers(id, token);

  return res.status(204).send(userData);
};

export const updateActiveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const user: TResponseUser = await updateUserService(id);

  return res.status(200).send(user);
};
