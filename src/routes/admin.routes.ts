import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth.middleware.js";
import {
    getConversations,
    getMessages,
    deleteConversation,
} from "../controllers/admin.controller.js";

const router = Router();


router.get("/conversations", requireAdmin, getConversations);
router.get("/conversations/:id/messages", requireAdmin, getMessages);
router.delete("/conversations/:id", requireAdmin, deleteConversation);

export default router;
