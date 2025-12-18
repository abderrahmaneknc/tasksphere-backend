import { Router } from "express";
import { login, register } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/auth.schema";


const router = Router();

// POST /auth/register

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
export default router;
