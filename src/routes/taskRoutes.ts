import { Router } from "express";
import { createTask } from "../controllers/taskController";
import { authenticate } from "../middleware/auth";  
const router = Router();

//POST
router.post("/createTask", authenticate,createTask);
export default router;
    