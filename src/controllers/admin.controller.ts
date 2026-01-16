import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

/**
 * GET /api/admin/conversations
 */
export const getConversations = async (req: Request, res: Response) => {
    const conversations = await Conversation.find()
        .sort({ updatedAt: -1 })
        .lean();

    const result = await Promise.all(
        conversations.map(async (conv) => {
            const lastMessage = await Message.findOne({
                conversationId: conv._id,
            })
                .sort({ createdAt: -1 })
                .lean();

            return {
                _id: conv._id,
                visitorName: conv.visitorName,
                status: conv.status,
                createdAt: conv.createdAt,
                lastMessage: lastMessage?.content || "",
            };
        })
    );

    res.json(result);
};

/**
 * GET /api/admin/conversations/:id/messages
 */
export const getMessages = async (req: Request, res: Response) => {
    const { id } = req.params;
    const messages = await Message.find({ conversationId: id })
        .sort({ createdAt: 1 })
        .lean();

    res.json(messages);
};

/**
 * DELETE /api/admin/conversations/:id
 */
export const deleteConversation = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Conversation.findByIdAndDelete(id);
    await Message.deleteMany({ conversationId: id });

    res.json({ success: true });
};
