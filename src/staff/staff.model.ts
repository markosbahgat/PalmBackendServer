import mongoose, { Document, Schema } from "mongoose";
import { DocumentStatus } from "../shared/constants";

export interface IStaff extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  phone_number: string;
  image: string;
  email: string;
  password: string;
  role: mongoose.Types.ObjectId;
  branch: mongoose.Types.ObjectId;
  salary: number;
  descriptor?: number[];
  flag: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const StaffSchema = new Schema(
  {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branches",
      required: false,
    },
    salary: { type: Number, required: false },
    descriptor: { type: [Number], required: false },
    flag: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.NEW,
      required: true,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
    collection: "staff",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      },
    },
  },
);

export const Staff = mongoose.model<IStaff>("staff", StaffSchema);
