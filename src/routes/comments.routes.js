import { Router } from "express";

import { indexView, index } from "../controllers/comments.controller.js";

const router = Router();

//Vistas
router.get("/comments", indexView);

// API CRUD
router.get("/api/comments", index);

export default router;