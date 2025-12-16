import { Router } from "express";
import { register } from "../controllers/authController";

const router = Router();

// POST /auth/register
router.post("/register", register);

export default router;
