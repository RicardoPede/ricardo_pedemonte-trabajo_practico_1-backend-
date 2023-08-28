import { Router } from "express";

import { index } from "../controllers/comments.controller.js";
import { commentValidation } from "../validation/checkComment.js";
import { validationSchema } from "../validation/validation.js";

const router = Router();

// API CRUD
router.get("/api/comments", commentValidation, validationSchema, index);

export default router;