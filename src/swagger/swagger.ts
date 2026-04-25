import type { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { env } from "../config/env";
import { swaggerOptions } from "../config/swagger.config";

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use(env.swaggerRoute, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
