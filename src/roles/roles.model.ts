import mongoose, { Document, Schema } from "mongoose";
import { DocumentStatus } from "../shared/constants";

export interface IRole extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  permissions: mongoose.Types.ObjectId[];
  flag: string;
  createdAt: Date;
  updatedAt: Date;
}

export const RoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "permissions" }],
    flag: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.NEW,
      required: true,
    },
  },
  { timestamps: true, collection: "roles" },
);

export const Role = mongoose.model<IRole>("roles", RoleSchema);
