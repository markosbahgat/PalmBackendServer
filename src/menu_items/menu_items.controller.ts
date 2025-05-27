import { NextFunction, Request, Response } from "express";
import { DocumentStatus } from "../shared/constants";
import { Staff } from "../staff/staff.model";

import { MenuItem } from "./menu_items.model";
import { findMenuItems } from "./menu_items.service";

export const getMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      search,
      category,
      subCategory,
      createdBy,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    // Construct filters dynamically
    const filters: any = {
      flag: { $in: [DocumentStatus.NEW, DocumentStatus.UPDATED] },
    };

    if (search) {
      filters.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    if (category) {
      filters.category = category;
    }

    if (subCategory) {
      filters.sub_category = subCategory;
    }

    if (createdBy) {
      filters.created_by = createdBy;
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const menuItems = await findMenuItems(
      filters,
      [
        { path: "category" },
        { path: "sub_category" },
        // { path: "ingredients.stock", model: Stock },
        { path: "created_by", model: Staff, select: "name email" },
      ],
      { [sortBy as string]: sortOrder === "desc" ? -1 : 1 },
      +page,
      +limit,
    );

    // Get total count for pagination metadata
    const totalItems = await MenuItem.countDocuments(filters);

    res.status(200).json({
      total: totalItems,
      page: +page,
      limit: +limit,
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};
