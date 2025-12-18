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
      where: req.user?.isAdmin
        ? {}
        : { userId: req.user?.id }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.user?.isAdmin && task.userId !== req.user?.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.user?.isAdmin && task.userId !== req.user?.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: req.body
    });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.user?.isAdmin && task.userId !== req.user?.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await prisma.task.delete({
      where: { id: taskId }
    });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
