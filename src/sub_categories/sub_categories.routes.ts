import express from "express";

import { getSubCategories } from "./sub_categories.controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the sub-category
 *         icon:
 *           type: file
 *           description: the sub-category icon
 *         parent_category_id:
 *           type: string
 *           description: the parent category id
 */

/**
 * @swagger
 * /sub_categories:
 *   get:
 *     summary: Get all sub categories
 *     tags: [Sub Categories]
 *     responses:
 *       200:
 *         description: List of all sub Categories
 *       500:
 *         description: Server error
 */
router.get("/", getSubCategories);

export default router;
