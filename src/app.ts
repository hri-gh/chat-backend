import express, { Request, Response } from 'express';
import { errorMiddleware } from './middleware/error.middleware.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js'

const app = express();

connectDB()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

app.use(
    cors({
        origin: (origin, callback) => {
            // allow Postman / server-to-server
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);


app.use(express.json())
app.use(cookieParser())


// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server is running!');
// });

import testRouter from './routes/test.route.js'
import adminRouter from "./routes/admin.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
// import adminAuthRouter from "./routes/adminAuth.routes.js";

app.use('/api/test', testRouter)
app.use("/api/admin", adminRouter);
app.use("/api/conversations", conversationRouter);
// app.use("/api/admin/auth", adminAuthRouter);


app.use(errorMiddleware)

export default app
