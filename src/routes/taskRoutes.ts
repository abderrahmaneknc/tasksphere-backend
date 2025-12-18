import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.use(authenticate);

router.post("/cerateTask", createTask);
router.get("/getTasks", getTasks);
router.get("/getTask/:id", getTask);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);

export default router;