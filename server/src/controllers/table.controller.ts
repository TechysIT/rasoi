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

    const table = await prisma.table.findMany({ where: { storeId } });

    res
      .status(200)
      .json(new ApiResponse(200, table, "Table retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { getTableList };
