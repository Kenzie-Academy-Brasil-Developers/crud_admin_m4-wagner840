import { Request, Response } from "express";
import { TReqLogin } from "../interfaces/login.interface";
import { createSessionLogin } from "../services/login/createSession.logis";

export const createControllerLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TReqLogin = req.body;
  const token = await createSessionLogin(payload);

  return res.status(200).send({ token });
};
