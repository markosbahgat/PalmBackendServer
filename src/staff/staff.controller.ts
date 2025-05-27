import { NextFunction, Request, Response } from "express";

import { Role } from "../roles/roles.model";
import { DocumentStatus } from "../shared/constants";

import { Staff } from "./staff.model";

export const findStaff = async (
  query: any,
  populateOptions?: any,
  sortOptions?: any,
  page?: number,
  limit?: number,
) => {
  const skip = (Number(page) - 1) * Number(limit) || 0;
  const staff = await Staff.find(
    query,
    {},
    { sort: sortOptions, skip, limit },
  ).populate(populateOptions);
  return staff;
};

export const getStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "createdAt",
      sortOrder = "asc",
      role,
      branch,
      salary,
    } = req.query;

    const query: any = {
      flag: { $in: [DocumentStatus.NEW, DocumentStatus.UPDATED] },
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone_number: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (branch) {
      query.branch = branch;
    }
    if (salary) {
      query.salary = salary;
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder === "desc" ? -1 : 1;

    const categories = await Staff.find(query)
      .populate({ path: "role", model: Role })
      // .populate({path: 'branch', model: Branch})
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Staff.countDocuments(query);

    res.status(200).json({
      data: categories,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
};
