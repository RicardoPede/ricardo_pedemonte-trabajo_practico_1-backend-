import { Router } from "express";

import index from "../controllers/comments.controller.js";

const router = Router();

// API CRUD
router.get("/api/comments", index);

export default router;