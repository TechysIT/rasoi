import { prisma } from "../db/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// Fetch all Orders by Store ID
const getOrders = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const orders = await prisma.order.findMany({ where: { storeId } });
    res
      .status(200)
      .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { getOrders };
