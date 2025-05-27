import mongoose, { Document, Schema } from "mongoose";
import { DocumentStatus } from "../shared/constants";

export interface IMenuItem extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  category: mongoose.Types.ObjectId;
  images: string[];
  sub_category?: mongoose.Types.ObjectId;
  icon: string;
  isAvailable: boolean;
  created_by: mongoose.Types.ObjectId;
  createdAt: Date;
  size?: string;
  status: "ACTIVE" | "INACTIVE";
  ingredients: {
    stock: mongoose.Types.ObjectId;
    amount: number;
    unit: string;
  }[];
  updatedAt: Date;
  flag: string;
}

export const MenuItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    images: { type: [String], required: true },
    sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "sub_categories",
      default: null,
    },
    icon: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "staff" },
    size: { type: [String], required: false },
    ingredients: [
      {
        _id: false,
        stock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "stocks",
          required: true,
        },
        amount: { type: Number, required: true },
      },
    ],
    quantity: { type: Number, required: false },
    costPrice: { type: Number, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    flag: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.NEW,
      required: true,
    },
  },
  {
    collection: "menu_items",
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      },
    },
  },
);

export const MenuItem = mongoose.model<IMenuItem>("menu_items", MenuItemSchema);
