import { prisma } from "../db/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// Fetch all Reports by Store ID
const getReports = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const reports = await prisma.report.findMany({ where: { storeId } });
    res
      .status(200)
      .json(new ApiResponse(200, reports, "Reports retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { getReports };
