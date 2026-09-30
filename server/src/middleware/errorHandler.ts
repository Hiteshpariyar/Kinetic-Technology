// server/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("🛑 Error:", err);
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  // Do not leak stack traces in production
  const response: any = { message };
  if (process.env.NODE_ENV !== "production" && err.stack) {
    response.stack = err.stack;
  }
  res.status(status).json(response);
};

