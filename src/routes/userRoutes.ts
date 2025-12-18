import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/admin";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
} from "../controllers/userController";

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUserRole/:id/role", updateUserRole);

export default router;
