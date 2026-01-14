import mongoose from "mongoose"
import { logger } from "../utils/logger.js"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL!)
        logger.info(`MongoDB connected: ${conn.connection.name}`)
    } catch (error) {
        logger.error("MongoDB connection failed", error)
        process.exit(1)
    }
}
