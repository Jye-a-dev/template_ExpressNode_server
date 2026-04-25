import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundMiddleware: RequestHandler = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message ?? "Internal Server Error",
  });
};
