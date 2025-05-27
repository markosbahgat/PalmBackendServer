import express from "express";

import { createOrder, deleteOrder, getOrders } from "./orders.controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - branch
 *         - customer
 *         - items
 *         - total_to_pay
 *         - status
 *         - order_date
 *         - payment_status
 *       properties:
 *         branch:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the branch
 *         customer:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the customer
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *                 format: ObjectId
 *                 description: The ID of the menu item
 *               count:
 *                 type: number
 *                 description: The quantity of the menu item
 *               price:
 *                 type: number
 *                 description: The price of the menu item
 *         total_to_pay:
 *           type: number
 *           description: The total amount of the order
 *         status:
 *           type: string
 *           enum: [pending, preparing, ready, completed, cancelled]
 *           description: The status of the order
 *         order_date:
 *           type: string
 *           format: date-time
 *           description: The date and time of the order
 *         payment_status:
 *           type: string
 *           enum: [pending, paid, failed]
 *           description: The payment status of the order
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the order
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the order
 */

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 */
router.post("/create", createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get("/", getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/:id", deleteOrder);

export default router;
