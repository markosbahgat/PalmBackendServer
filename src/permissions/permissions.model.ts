import mongoose, { Document, Schema } from "mongoose";
import { DocumentStatus } from "../shared/constants";

export interface IPermission extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  flag: string;
  createdAt: Date;
  updatedAt: Date;
}

export const PermissionSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    flag: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.NEW,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "permissions",
  },
);

export const Permission = mongoose.model<IPermission>(
  "permissions",
  PermissionSchema,
);
