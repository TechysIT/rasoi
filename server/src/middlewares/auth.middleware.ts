import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import { asyncHandler } from "../utils/asyncHandler";

// Extend Request type to include `user`
interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get token from cookies
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Unauthorized: Invalid token");
    }

    // Fetch user from DB
    const user = await prisma.organization.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    // Attach user to request object
    req.user = user;
    next();
  },
);
