import { Router } from "express";
import { adminLogin, adminLogout } from "../controllers/adminAuth.controller.js";
import { requireAdmin } from "../middleware/adminAuth.middleware.js";

const router = Router();

router.post("/login", adminLogin);
router.post("/logout", requireAdmin, adminLogout);

export default router;
