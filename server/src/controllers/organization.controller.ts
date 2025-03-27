import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse";
import { generateAccessToken } from "../utils/TokenGenerator";
import { OrganizationLoginRequestBody, TokenResponse } from "../utils/types";

const generateToken = async (userId: string): Promise<TokenResponse> => {
  try {
    const user = await prisma.organization.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = await generateAccessToken(user);
    return { accessToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed");
  }
};

const organizationLogin = asyncHandler(async (req, res) => {
  try {
    // Extract email & password
    const { email, password }: OrganizationLoginRequestBody = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    // Find the organization
    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    if (!organization) {
      throw new ApiError(401, "User not found");
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid password");
    }

    // Generate access token
    const { accessToken } = await generateToken(organization.id);

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    };

    // Store the token in an HTTP-only cookie
    res.cookie("accessToken", accessToken, cookieOptions);

    // Send response
    return res.status(200).json(
      new ApiResponse(
        200,

        {
          id: organization.id,
          name: organization.name,
          email: organization.email,
          subscriptionStart: organization.subscriptionStart,
          subscriptionEnd: organization.subscriptionEnd,
          accessToken, // Return for frontend use if needed
        },
        "User logged in successfully",
      ),
    );
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Login failed", error);
  }
});

const getStores = asyncHandler(async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const stores = await prisma.store.findMany({ where: { organizationId } });
    res
      .status(200)
      .json(new ApiResponse(200, stores, "Stores retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { organizationLogin, getStores };
