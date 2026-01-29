import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";


export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) throw new ApiError(401, "Invalid credentials");

    const isValid = await admin.comparePassword(password);
    if (!isValid) throw new ApiError(401, "Invalid credentials");

    const token = jwt.sign(
        { adminId: admin._id },
        process.env.ADMIN_JWT_SECRET!,
        { expiresIn: "7d" }
    );

    res.cookie("admin_token", token, {
        httpOnly: true,
        sameSite: "lax",
    });

    res.json(new ApiResponse({ admin: admin._id }, "Admin logged in"));
});

export const adminLogout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie("admin_token", {
        httpOnly: true,
        sameSite: "lax",
    });

    res.json(new ApiResponse({}, "Logged out"));
});
