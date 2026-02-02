// src/socket/admin.ts
import { Server, Socket } from "socket.io";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import jwt from "jsonwebtoken";

export function registerAdminSocket(socket: Socket, io: Server) {
    // if (!socket.data.admin) return;

    // socket.use((packet, next) => {
    //     const token = socket.handshake.auth?.token;
    //     if (!token) return next(new Error("Unauthorized"));

    //     try {
    //         jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
    //         next();
    //     } catch {
    //         next(new Error("Invalid token"));
    //     }
    // })


    // Admin joins a conversation room
    socket.on("admin:join", async ({ conversationId }) => {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) return;

        socket.join(conversationId);
        socket.emit("admin:ready", { conversationId });
    });

    // Admin sends message
    socket.on("admin:message:send", async ({ conversationId, content }) => {
        if (!content?.trim()) return;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation || conversation.status === "closed") return;

        // if (conversation.status === "closed") {
        //     socket.emit("conversation:error", {
        //         message: "Conversation is closed",
        //     });
        //     return;
        // }

        const message = await Message.create({
            conversationId,
            sender: "admin",
            content,
        });

        io.to(conversationId).emit("message:new", {
            sender: "admin",
            content: message.content,
            createdAt: message.createdAt,
        });
    });

    // Admin closes conversation
    socket.on("admin:conversation:close", async ({ conversationId }) => {
        await Conversation.findByIdAndUpdate(conversationId, {
            status: "closed",
        });

        //     const conversation = await Conversation.findByIdAndUpdate(
        //     conversationId,
        //     { status: "closed" },
        //     { new: true }
        // );


        // console.log(conversation)
        // if (!conversation) return;

        // 🔹 Notify chat participants
        io.to(conversationId).emit("conversation:closed", {
            conversationId,
            reason: "ended_by_admin",
        });

        // 🔥 NEW: Notify ALL admins (like conversation:new)
        // io.emit("conversation:updated", {
        //     _id: conversation._id,
        //     status: conversation.status, // "closed"
        //     updatedAt: conversation.updatedAt,
        // });
    });
}
