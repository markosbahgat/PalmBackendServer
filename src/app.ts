import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { connectToDatabase } from "./config/db";
import setupSwagger from "./config/swagger";
import { errorHandler } from "./shared/globalError";

import authRoutes from "./auth/auth.routes";
import { authenticateToken } from "./authMiddleware";

import categoriesRoutes from "./categories/categories.routes";

import menuItemsRoutes from "./menu_items/menu_items.routes";

import rolesRoutes from "./roles/roles.routes";
import staffRoutes from "./staff/staff.routes";

import subCategoriesRoutes from "./sub_categories/sub_categories.routes";
import ordersRoutes from "./orders/orders.routes";
import permissionsRoutes from "./permissions/permissions.routes";

const app = express();
const server = http.createServer(app);

app.use(cors());
dotenv.config();
connectToDatabase()
  .then((res) => {
    console.log("Connected to MongoDB Successfully!");
  })
  .catch((err) => {
    console.log("Error Establishing connection with database: ", err);
  });
const PORT = process.env.PORT ?? 5001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use("/categories", categoriesRoutes);
app.use("/menu_items", menuItemsRoutes);
app.use("/staff", authenticateToken, staffRoutes);
app.use("/auth", authRoutes);
app.use("/sub_categories", subCategoriesRoutes);
app.use("/roles", rolesRoutes);
app.use("/permissions", permissionsRoutes);
app.use("/orders", ordersRoutes);

app.use(errorHandler);
// throw new HttpError(400, 'Bad Request Happened!');

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
