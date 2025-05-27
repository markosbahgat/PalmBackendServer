import { NextFunction, Request, Response } from "express";
import { Permission } from "./permissions.model";

export const getPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};
