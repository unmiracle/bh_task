import { Router } from "express";
import { getCurrentUser, loginUser, registerUser } from "./users.service";
import { auth } from "../common/middlewares/auth.middleware";

const router = Router();

// router.get("/users");

router.get("/users/me", auth, getCurrentUser);

// router.post("/users");

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

router.put("/users/:id");

// add middleware
router.put("/users/:id/role");

router.delete("/users/:id");

export default router;
