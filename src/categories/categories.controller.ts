import { NextFunction, Request, Response } from "express";
import { DocumentStatus } from "../shared/constants";
import { SubCategory } from "../sub_categories/sub_categories.model";
import { findCategories } from "./categories.service";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await findCategories(
      { flag: { $in: [DocumentStatus.NEW, DocumentStatus.UPDATED] } },
      { path: "sub_categories", model: SubCategory },
    );
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
