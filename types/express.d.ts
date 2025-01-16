import "express";

declare global {
  namespace Express {
    interface Request {
      userRole?: string;
      userId?: string;
    }
  }
}
