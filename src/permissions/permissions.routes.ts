import express from "express";
import { getPermissions } from "./permissions.controller";
import { authenticateToken } from "../authMiddleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the permission
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the permission
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the permission
 */

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of all permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *       500:
 *         description: Server error
 */
router.get("/", authenticateToken, getPermissions);

export default router;
