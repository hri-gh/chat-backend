import express, { Request, Response } from 'express';
import { errorMiddleware } from './middleware/error.middleware.js';
import cors from 'cors'
import testRouter from './routes/test.route.js'
import { connectDB } from './config/db.js'

const app = express();

connectDB()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: false
}))

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server is running!');
});

app.use('/api/test', testRouter)

app.use(errorMiddleware)

export default app
