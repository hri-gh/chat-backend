import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { registerVisitorSocket } from "./visitor.js";
import { registerAdminSocket } from "./admin.js";
import jwt from "jsonwebtoken";

let io: Server;

export function initSocket(server: HttpServer) {
    // io = new Server(server, {
    //     cors: {
    //         origin: "*", // later restrict
    //     },
    // });

    const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

    io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true,
        },
    });


    // io.use((socket, next) => {
    //     const token = socket.handshake.auth?.token;

    //     if (!token) return next(new Error("Unauthorized"));

    //     try {
    //         const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
    //         socket.data.admin = decoded;
    //         next();
    //     } catch {
    //         next(new Error("Invalid token"));
    //     }
    // });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        // 👇 register feature-specific events
        registerVisitorSocket(socket, io);
        registerAdminSocket(socket, io);

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
    return io
}

// allow usage in APIs if needed
export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}
