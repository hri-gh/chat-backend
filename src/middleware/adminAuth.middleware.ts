import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";
import { Request, Response, NextFunction } from "express";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.admin_token || req.header("Authorization")?.replace("Bearer", "")
    // console.log("TOKEN:", req.cookies?.admin_token)
    if (!token) throw new ApiError(401, "Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
        req.admin = decoded as any;
        next();
    } catch {
        throw new ApiError(401, "Invalid token");
    }
};
