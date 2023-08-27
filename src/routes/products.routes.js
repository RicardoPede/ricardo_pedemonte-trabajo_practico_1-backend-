import { Router } from "express";

import { index, show, update, store, destroy } from "../controllers/products.controller.js";

const router = Router();

// API CRUD
router.get("/api/products", index);
router.get("/api/products/:id/show", show);
router.post("/api/products", store);
router.put("/api/products/:id/update", update);
router.delete("/api/products/:id/destroy", destroy);

export default router;