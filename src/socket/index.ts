import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { registerVisitorSocket } from "./visitor.js";
import { registerAdminSocket } from "./admin.js";


let io: Server;

export function initSocket(server: HttpServer) {
    io = new Server(server, {
        cors: {
            origin: "*", // later restrict
        },
    });

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
