import { NextFunction, Request, Response } from "express";

import { DocumentStatus } from "../shared/constants";
import { SubCategory } from "./sub_categories.model";

export const getSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subCategories = await SubCategory.find({
      flag: { $in: [DocumentStatus.NEW, DocumentStatus.UPDATED] },
    });

    res.status(200).json(subCategories);
  } catch (error) {
    next(error);
  }
};
