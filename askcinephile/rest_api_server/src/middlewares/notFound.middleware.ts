import { NextFunction, Request, Response } from "express";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(404).json({ error: "Sorry can't find that!" });
}
