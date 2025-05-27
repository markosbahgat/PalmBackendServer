import mongoose, { Document, Schema } from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
import {
  DocumentStatus,
  OrderStatus,
  OrderType,
  PaymentStatus,
} from "../shared/constants";

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId | null;
  items: {
    item: mongoose.Types.ObjectId;
    count: number;
    price: number;
  }[];
  total_to_pay: number;
  order_number: number;
  status: OrderStatus;
  order_date: Date;
  payment_status: PaymentStatus;
  order_type: OrderType;
  session?: mongoose.Types.ObjectId;
  delivery_address?: string;
  flag: string;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: false,
      default: null,
    },
    items: [
      {
        _id: false,
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "menu_items",
          required: true,
        },
        count: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total_to_pay: { type: Number, required: true },
    order_number: { type: Number, required: true, unique: true },
    status: {
      type: String,
      required: true,
      enum: OrderStatus,
      default: OrderStatus.pending,
    },
    order_date: { type: Date, required: true },
    payment_status: {
      type: String,
      required: true,
      enum: PaymentStatus,
      default: PaymentStatus.pending,
    },
    order_type: {
      type: String,
      required: true,
      enum: OrderType,
      default: OrderType.dine_in,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sessions",
      required: false,
      default: null,
    },
    delivery_address: { type: String, required: false, default: null },
    flag: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.NEW,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  },
);

OrderSchema.plugin(autoIncrement, {
  model: "orders",
  field: "order_number",
  startAt: 1,
  incrementBy: 1,
});

export const Order = mongoose.model<IOrder>("orders", OrderSchema);
