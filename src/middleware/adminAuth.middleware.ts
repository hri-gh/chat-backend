import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";
import { Request, Response, NextFunction } from "express";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    // const token = req.cookies?.admin_token || req.header("Authorization")?.replace("Bearer", "")
    // console.log("TOKEN:", req.cookies?.admin_token)
    // const authHeader = req.header("Authorization")
    const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];
    // const token = authHeader.replace("Bearer ", "").trim()
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    // console.log("Auth_Header::", authHeader)

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //             return res.status(401).json({
    //                 success: false,
    //                 message: "No authorization token provided"
    //             })
    //         }

    if (!token) throw new ApiError(401, "Unauthorized");
    // const token = authHeader.replace("Bearer ", "").trim()
    // console.log("BACKEND_TOKEN::",token)



    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
        // console.log("DECODED::", decoded)
        req.admin = decoded as any;
        next();
    } catch {
        throw new ApiError(401, "Invalid token");
    }
};
