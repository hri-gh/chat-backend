// src/socket/visitor.ts
import { Server, Socket } from "socket.io";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export function registerVisitorSocket(socket: Socket, io: Server) {
    // Join conversation
    socket.on("conversation:join", async ({ conversationId }) => {
        if (!conversationId) {
        socket.emit("conversation:error", {
            message: "conversationId missing",
        });
        return;
    }
        const conversation = await Conversation.findById(conversationId);

        if (!conversation || conversation.status === "closed") {
            socket.emit("conversation:error", {
                message: "Conversation not found or closed",
            });
            return;
        }

        conversation.socketId = socket.id;
        await conversation.save();

        socket.join(conversationId);
        socket.emit("conversation:ready", { conversationId });
    });

    // Send message
    socket.on("message:send", async ({ conversationId, content }) => {
        if (!content?.trim()) return;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation || conversation.status === "closed") return;

        const message = await Message.create({
            conversationId,
            sender: "visitor",
            content,
        });

        // 🔴 ADMIN VISIBILITY (terminal)
    console.log(
        `[CHAT] ${conversation.visitorName}: ${content}`
    );

        io.to(conversationId).emit("message:new", {
            sender: message.sender,
            content: message.content,
            createdAt: message.createdAt,
        });
    });

    // End conversation
    socket.on("conversation:end", async ({ conversationId }) => {
        await Conversation.findByIdAndUpdate(conversationId, {
            status: "closed",
        });

        io.to(conversationId).emit("conversation:closed", {
            reason: "ended_by_user",
        });
    });
}
