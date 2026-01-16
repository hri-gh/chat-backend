import { Router } from "express";

import {
    startConversation,
} from "../controllers/conversation.controller.js";
const router = Router();

// routes/conversation.routes.ts
router.post("/start", startConversation);


export default router;
