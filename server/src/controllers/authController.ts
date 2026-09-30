import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { signToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../middleware/authenticate";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Find or create default "Client" role
    let role = await prisma.role.findFirst({ where: { name: "Client" } });
    if (!role) {
      role = await prisma.role.create({
        data: {
          name: "Client",
          description: "Standard client user",
        },
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        roleId: role.id,
      },
      include: { role: true },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role.name,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Admin ID / Email and password are required" });
      return;
    }

    // Master Super Admin check:
    // ID: kinetictechnology.admin.com
    // Password: kinetictechnology@admin307628
    const isAdminId =
      email.trim().toLowerCase() === "kinetictechnology.admin.com" ||
      email.trim().toLowerCase() === "admin@kinetictech.com";
    if (isAdminId && password === "kinetictechnology@admin307628") {
      const adminToken = signToken({
        userId: "admin_master_1",
        email: "kinetictechnology.admin.com",
        role: "Admin",
      });

      res.cookie("token", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Admin authentication successful",
        user: {
          id: "admin_master_1",
          email: "kinetictechnology.admin.com",
          name: "Kinetic Super Admin",
          role: "Admin",
        },
        token: adminToken,
      });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
      });

      if (!user) {
        res.status(401).json({ message: "Invalid ID or password" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid ID or password" });
        return;
      }

      const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role.name,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.name,
        },
        token,
      });
      return;
    } catch {
      res.status(401).json({ message: "Invalid ID or password" });
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { role: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
