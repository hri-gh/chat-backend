// src/socket/admin.ts
import { Server, Socket } from "socket.io";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export function registerAdminSocket(socket: Socket, io: Server) {
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

        io.to(conversationId).emit("conversation:closed", {
            reason: "ended_by_admin",
        });
    });
}
