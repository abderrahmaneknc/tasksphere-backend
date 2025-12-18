import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  deadline: z.string().datetime().optional(),
  status: z.enum(["TODO", "DOING", "DONE"]).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
