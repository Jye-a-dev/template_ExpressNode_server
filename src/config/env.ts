import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  apiPrefix: process.env.API_PREFIX ?? "/api/v1",
  swaggerRoute: process.env.SWAGGER_ROUTE ?? "/docs",
  swaggerTitle: process.env.SWAGGER_TITLE ?? "Template Node Server API",
  swaggerVersion: process.env.SWAGGER_VERSION ?? "1.0.0",
  swaggerDescription:
    process.env.SWAGGER_DESCRIPTION ?? "Express TypeScript API template",
  databaseUrl: process.env.DATABASE_URL,
};
