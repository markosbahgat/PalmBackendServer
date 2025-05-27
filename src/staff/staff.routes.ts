import { Router } from "express";
import { getStaff } from "./staff.controller";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: API for managing staff
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *   schemas:
 *     Staff:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - phone_number
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The staff member's name.
 *           example: "John Doe"
 *         image:
 *           type: file
 *           description: URL of the staff member's image.
 *         descriptor:
 *           type: array
 *           items:
 *              type: number
 *              format: float
 *           description: The staff member's descriptor.
 *         phone_number:
 *            type: string
 *            description: Phone number of the staff
 *            example: "01286993320"
 *         email:
 *           type: string
 *           description: The staff member's unique email.
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: The staff member's password (stored as a hash).
 *           example: "hashed_password"
 *         role:
 *           type: string
 *           description: The role of the staff member (e.g., admin, staff).
 *           example: "admin"
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff
 *     security:
 *      - BearerAuth: []
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: List of all Staff
 *       500:
 *         description: Server error
 */
router.get("/", getStaff);

export default router;
