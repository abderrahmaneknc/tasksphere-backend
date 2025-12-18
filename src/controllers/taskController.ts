import { Request, Response } from "express";
import { prisma } from "../lib/prisma"; // your Prisma instance
import { authenticate } from "../middleware/auth";

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId =req.user?.id; 
    if (!userId){
        return res.status(401).json({message:"unauthorized"})
    }
    const { title, description, deadline } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        deadline: deadline ? new Date(deadline) : null,
        userId: userId // from authenticate middleware
      },
    });

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: "desc" },
    });

    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task || task.userId !== req.user!.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, deadline } = req.body;

    const existingTask = await prisma.task.findUnique({ where: { id: Number(id) } });

    if (!existingTask || existingTask.userId !== req.user!.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        deadline: deadline ? new Date(deadline) : null,
      },
    });

    res.json({ message: "Task updated", task: updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingTask = await prisma.task.findUnique({ where: { id: Number(id) } });

    if (!existingTask || existingTask.userId !== req.user!.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({ where: { id: Number(id) } });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

