import { Request, Response, NextFunction } from "express";

// Middleware to allow only admins
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
