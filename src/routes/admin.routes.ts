import { Router } from "express";
import {
    getConversations,
    getMessages,
    deleteConversation,
} from "../controllers/admin.controller.js";

const router = Router();

router.get("/conversations", getConversations);
router.get("/conversations/:id/messages", getMessages);
router.delete("/conversations/:id", deleteConversation);

export default router;
