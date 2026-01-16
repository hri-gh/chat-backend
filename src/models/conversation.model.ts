// src/models/conversation.model.ts
import mongoose, { Schema, Types } from "mongoose";

export type ConversationStatus = "active" | "closed";

export interface ConversationDocument {
    visitorName: string;
    status: ConversationStatus;
    socketId?: string;       // current connected socket
    createdAt: Date;
    updatedAt: Date;
}

const conversationSchema = new Schema<ConversationDocument>(
    {
        visitorName: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "closed"],
            default: "active",
        },
        socketId: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
