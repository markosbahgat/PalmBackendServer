import { NextFunction, Request, Response } from "express";

import {
  DocumentStatus,
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
} from "../shared/constants";

import { ResponseError } from "../utils/ResponseError";
import { Order } from "./order.model";

interface CreateOrderRequest {
  customer: any;
  items: any[];
  total_to_pay: number;
  table: any;
  status: OrderStatus;
  payment_status: PaymentStatus;
  order_type: OrderType;
  session_id: string;
  payment_method: PaymentMethod;
  delivery_address: any;
}

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderData: CreateOrderRequest = req.body;

    // Validate required fields
    if (!orderData.items || !orderData.total_to_pay) {
      throw new ResponseError(400, "Missing required fields");
    }

    const order = await Order.create({
      ...orderData,
      order_number: undefined,
      order_date: new Date(),
      flag: DocumentStatus.NEW,
    });

    res.status(200).json(order);
  } catch (error) {
    console.log(error, "orderData");
    next(error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      order_type,
      branch,
    } = req.query;

    const query: any = {
      flag: { $in: [DocumentStatus.NEW, DocumentStatus.UPDATED] },
    };

    if (search) {
      query.$or = [
        { order_number: { $regex: search, $options: "i" } },
        { "customer.name": { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (order_type) {
      query.order_type = order_type;
    }

    if (branch) {
      query.branch = branch;
    }

    const orders = await Order.find(query)
      // .populate('branch')
      // .populate('customer')
      // .populate('session')
      .populate("items.item")
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ order_date: -1 });

    const total = await Order.countDocuments(query);

    res.status(200).json({
      data: orders,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        flag: DocumentStatus.DELETED,
      },
      { new: true },
    );

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
