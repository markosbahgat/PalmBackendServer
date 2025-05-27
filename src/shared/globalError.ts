import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/HttpError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode =
    err instanceof HttpError ? err.statusCode : err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode || 500).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
};
