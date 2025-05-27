import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant API",
      version: "1.0.0",
      description: "API documentation for restaurant orders management",
    },
    components: {},
    // security: [{ BearerAuth: [] }],
  },
  apis: ["./src/**/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
