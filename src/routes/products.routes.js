import { Router } from "express";

import { indexView, showView, editView, createView, index, show, update, store, destroy } from "../controllers/products.controller.js";

const router = Router();

//Vistas
router.get("/products", indexView);
router.get("/products/:id/show", showView);
router.get("/products/:id/edit", editView);
router.get("/products/create", createView);

// API CRUD
router.get("/api/products", index);
router.get("/api/products/:id/show", show);
router.post("/api/products", store);
router.put("/api/products/:id/update", update);
router.delete("/api/products/:id/destroy", destroy);

export default router;