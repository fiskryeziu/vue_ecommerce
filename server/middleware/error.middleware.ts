import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack || err.message);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
};
