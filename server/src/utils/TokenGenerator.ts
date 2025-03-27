import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError";
import { Organization } from "@prisma/client";

const generateAccessToken = async (user: Organization) => {
  try {
    // Access token payload
    const payload = {
      _id: user.id,
      email: user.email,
      name: user.name,
      subscriptionStart: user.subscriptionStart,
      subscriptionEnd: user.subscriptionEnd,
    };

    const expiresIn = process.env.ACCESS_TOKEN_EXPIRY
      ? parseInt(process.env.ACCESS_TOKEN_EXPIRY)
      : 86400;

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn,
    });
  } catch (error) {
    throw new ApiError(500, "Error generating access token");
  }
};



export { generateAccessToken };
