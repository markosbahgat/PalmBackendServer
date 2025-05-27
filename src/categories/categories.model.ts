import mongoose, { Document, Schema } from "mongoose";
import { DocumentStatus } from "../shared/constants";
import { Types } from "mongoose";

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  icon?: string;
  sub_categories?: Types.ObjectId[];
  flag: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    description: { type: String },
    sub_categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "sub_categories",
    },
    flag: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.NEW,
      required: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  },
);

export const Category = mongoose.model<ICategory>("categories", CategorySchema);
