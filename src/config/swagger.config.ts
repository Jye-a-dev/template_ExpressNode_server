import type { Options } from "swagger-jsdoc";

import { env } from "./env";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: env.swaggerTitle,
      version: env.swaggerVersion,
      description: env.swaggerDescription,
    },
    servers: [
      {
        url: env.apiPrefix,
        description: "API server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["src/modules/**/*.route.ts", "src/swagger/**/*.yaml"],
};
