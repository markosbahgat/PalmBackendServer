import express from "express";

import { getMenuItems } from "./menu_items.controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - images
 *         - isAvailable
 *         - price
 *         - type
 *         - created_by
 *         - sub_category
 *         - icon
 *         - size
 *         - ingredients
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the menu item
 *         description:
 *           type: string
 *           description: Description of the menu item
 *         category:
 *           type: string
 *           description: Category ID of the menu item
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs for the menu item
 *         isAvailable:
 *           type: boolean
 *           description: Availability status
 *         price:
 *           type: number
 *           description: Price of the menu item
 *         type:
 *           type: string
 *           description: Type of menu item
 *         created_by:
 *           type: string
 *           description: User ID of the creator
 *         sub_category:
 *           type: string
 *           description: Sub-category ID of the menu item
 *         icon:
 *           type: string
 *           description: URL of the menu item icon
 *         size:
 *           type: string
 *           description: Size of the menu item
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredients used
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date of the menu item
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last updated date of the menu item
 */

/**
 * @swagger
 * /menu_items:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu Items]
 *     responses:
 *       200:
 *         description: List of all menu items
 *       500:
 *         description: Server error
 */
router.get("/", getMenuItems);

export default router;
