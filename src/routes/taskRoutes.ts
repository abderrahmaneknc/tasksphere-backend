import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/taskController";
import { authorizeAdmin } from "../middleware/admin";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../validators/task.schema";
const router = Router();

router.use(authenticate);

router.post("/cerateTask",validate(createTaskSchema), createTask);
router.get("/getTasks", getTasks);
router.get("/getTask/:id", getTask);
router.put("/updateTask/:id",validate(updateTaskSchema), updateTask);
router.delete("/deleteTask/:id",authorizeAdmin, deleteTask);

export default router;