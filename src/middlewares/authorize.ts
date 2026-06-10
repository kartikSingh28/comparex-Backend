import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/interface";
import { PERMISSIONS } from "../types/interface";

export const authorize = (permission: string) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const allowedRoles = PERMISSIONS[permission];

    if (!allowedRoles) {
      return res.status(500).json({
        success: false,
        message: "Permission not configured",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};