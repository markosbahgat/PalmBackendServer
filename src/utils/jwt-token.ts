import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

dotenv.config();

interface TokenPayload {
  id?: Types.ObjectId;
  role?: string;
  [key: string]: any;
}

export const generateToken = (
  payload: TokenPayload,
  expiresIn: string = "1d",
): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn } as jwt.SignOptions,
  );
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};
