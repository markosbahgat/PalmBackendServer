import mongoose from "mongoose";
import { DocumentStatus } from "../shared/constants";

interface ISubCategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  icon: string;
  parent_category_id: mongoose.Types.ObjectId;
  flag: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: { type: String, required: true },
    parent_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    flag: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.NEW,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "sub_categories",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      },
    },
  },
);

export const SubCategory = mongoose.model<ISubCategory>(
  "sub_categories",
  SubCategorySchema,
);
