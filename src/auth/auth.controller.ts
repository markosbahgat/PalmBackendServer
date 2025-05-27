import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
import { Permission } from "../permissions/permissions.model";
import { Role } from "../roles/roles.model";

import { Staff } from "../staff/staff.model";
import { comparePasswords, hashPassword } from "../utils/hash-password";
import { generateToken } from "../utils/jwt-token";

export const loginStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const staff = await Staff.findOne({ email }).populate({
      path: "role",
      model: Role,
      populate: { path: "permissions", model: Permission },
    });

    if (!staff) {
      res.status(400).json({ message: "Staff not found" });
      return;
    }

    const isMatch = await comparePasswords(password, staff.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken({ id: staff._id, role: "staff" }, "1d");
    res.status(200).json({ token, user: staff });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { oldPassword, newPassword, _id } = req.body;

    const user = await Staff.findById(_id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isMatch = await comparePasswords(oldPassword, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Old password is incorrect" });
      return;
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export interface IUser extends Document {
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}
