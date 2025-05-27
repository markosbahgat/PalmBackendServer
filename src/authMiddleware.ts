import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { Staff } from "./staff/staff.model";
import { verifyToken } from "./utils/jwt-token";
import { Types } from "mongoose";
import { Role } from "./roles/roles.model";

dotenv.config();

interface AuthRequest extends Request {
  user?: any; // Extend Request type to include "user"
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    const admin = await Staff.findById(decoded.id).select("-password");
    if (!admin) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    req.user = admin; // Attach decoded admin to request
    next();
  } catch (error) {
    console.log("🚀 ~ authenticateToken ~ error:", error);
    res.status(403).json({ message: "Forbidden: Invalid token", error });
    return;
  }
};

export const allowedTo = (
  allowedRoles: string[],
  requiredPermissions: string[],
) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user found" });
        return;
      }

      const roleDoc = await Role.findById(req.user.role)
        .select("name permissions")
        .populate({ path: "permissions", select: "name" });

      if (!roleDoc) {
        res.status(403).json({ message: "Forbidden: Role not found" });
        return;
      }

      const userRole = roleDoc.name;
      if (!allowedRoles.includes(userRole)) {
        res
          .status(403)
          .json({ message: "Forbidden: You do not have the required role" });
        return;
      }

      if (requiredPermissions.length === 0) {
        next();
        return;
      }

      const userPermissions = roleDoc.permissions.map((p: any) => p.name);

      const hasAllPermissions = requiredPermissions.every((perm) =>
        userPermissions.includes(perm),
      );

      if (!hasAllPermissions) {
        res.status(403).json({
          message: "Forbidden: You do not have the required permissions",
        });
        return;
      }

      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server error", error: (error as Error).message });
    }
  };
};
