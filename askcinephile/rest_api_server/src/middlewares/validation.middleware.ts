import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validate<
  Params = {},
  ResBody = {},
  ReqBody = {},
  ReqQuery = {}
>(validationSchema: z.ZodType) {
  return function (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      validationSchema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
}
