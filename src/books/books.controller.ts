import { Router } from "express";

const router = Router();

router.get("/books");

// add middleware
router.post("/books");

// add middleware
router.put("/books/:id");

// add middleware
router.delete("/books/:id");

export default router;
