import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../error";

const ensureBody =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length === 0) {
      throw new AppError("No data received.", 400);
    }

    const result = schema.parse(req.body);

    req.body = result;

    return next();
  };

export default ensureBody;
