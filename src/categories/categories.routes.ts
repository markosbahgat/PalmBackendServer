import express from "express";

import { getCategories } from "./categories.controller";

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
 *           type: string
 *           description: URL of the sub-category icon
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *         - sub_categories
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the category
 *         name:
 *           type: string
 *           description: Name of the category
 *         icon:
 *           type: string
 *           description: URL of the category icon
 *         sub_categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the sub-category
 *               icon:
 *                 type: string
 *                 description: URL of the sub-category icon
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the sub-category was created
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the sub-category was last updated
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the category was created
 *         flag:
 *            type: string
 *            enum: ["NEW", "UPDATED", "DELETED"]
 *            description: Status of the document
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the category was last updated
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all Categories
 *       500:
 *         description: Server error
 */
router.get("/", getCategories);

export default router;
