import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { SampleUser } from "../models/sample_user.model.js"

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await SampleUser.find()

    res.status(201).json(
        new ApiResponse(users, "Users fetched")
    )
})
