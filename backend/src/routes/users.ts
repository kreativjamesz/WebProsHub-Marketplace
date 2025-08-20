import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// Get user profile (protected route)
router.get("/profile", authenticateToken, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile (protected route)
router.put("/profile", authenticateToken, async (req: any, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: { name, email },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
