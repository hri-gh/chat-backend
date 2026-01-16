import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model.js";

export const startConversation = async (req: Request, res: Response) => {
  const { visitorName } = req.body;

  if (!visitorName) {
    return res.status(400).json({ message: "visitorName required" });
  }

  const conversation = await Conversation.create({
    visitorName,
    status: "active", // or omit (default)
  });

  res.status(201).json({
    conversationId: conversation._id,
  });
};

