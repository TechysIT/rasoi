import { prisma } from "../db/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// Fetch all Orders by Store ID
const getTableList = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    if (!storeId) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Store ID is required"));
    }

    const orders = await prisma.tableList.findMany({ where: { storeId } });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No orders found for this store"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { getTableList };
