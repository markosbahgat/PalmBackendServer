import { NextFunction, Request, Response } from "express";
import { DocumentStatus } from "../shared/constants";
import { Role } from "./roles.model";

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await Role.create({ ...req.body, status: "ACTIVE" });
    await role.save();
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await Role.find({
      flag: { $in: [DocumentStatus.NEW, DocumentStatus.UPDATED] },
    }).populate("permissions");
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};
