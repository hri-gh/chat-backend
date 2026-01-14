import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"

export const errorMiddleware = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode =
        err instanceof ApiError ? err.statusCode : 500

    const message =
        err instanceof ApiError
            ? err.message

            : "Internal Server Error"

    // Log full error ONLY on server
    console.error(err)

    res.status(statusCode).json({
        success: false,
        message,
    })
}
