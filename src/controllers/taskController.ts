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
