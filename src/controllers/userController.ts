import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateUserRole = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { isAdmin } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isAdmin },
    });

    res.json({
      message: "User role updated",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
