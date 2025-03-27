import { prisma } from "../db/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const softDeleteItem = asyncHandler(async (req, res) => {
  try {
    const { id, model, userId, storeId } = req.params; 

    if (!userId || !storeId) {
      throw new ApiError(400, "User ID and Store ID are required.");
    }

    // Check if user exists and fetch role
    const user = await prisma.employee.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const allowedRoles = ["admin", "manager"];
    if (!allowedRoles.includes(user.role)) {
      throw new ApiError(403, "You don't have permission to delete this item.");
    }

    let item;
    switch (model) {
      case "inventory":
        item = await prisma.inventory.findUnique({ where: { id } });
        break;
      case "order":
        item = await prisma.order.findUnique({ where: { id } });
        break;
      default:
        throw new ApiError(400, "Invalid model type.");
    }

    if (!item) {
      throw new ApiError(404, `${model} not found.`);
    }

    if (item.storeId !== storeId) {
      throw new ApiError(403, "You cannot delete items from another store.");
    }

    await prisma[model].update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    res
      .status(200)
      .json(new ApiResponse(200, null, `${model} deleted successfully`));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});
