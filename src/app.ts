import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/error.middleware";
import routes from "./routes";
import { setupSwagger } from "./swagger/swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.get("/", (_req, res) => {
  res.json({
    name: env.swaggerTitle,
    docs: env.swaggerRoute,
    api: env.apiPrefix,
  });
});

app.use(env.apiPrefix, routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
