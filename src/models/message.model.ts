// src/models/message.model.ts
import mongoose, { Schema, Types } from "mongoose";

export type SenderType = "visitor" | "admin";

export interface MessageDocument {
    conversationId: Types.ObjectId;
    sender: SenderType;
    content: string;
    createdAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true,
        },
        sender: {
            type: String,
            enum: ["visitor", "admin"],
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
