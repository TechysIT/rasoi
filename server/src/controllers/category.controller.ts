import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";
import { CategoryRegister } from "../utils/types";

const addCategory = asyncHandler(async (req, res) => {
  try {
    const { storeId, name, status, categoryIndex }: CategoryRegister = req.body;

    // Validate required fields
    if (
      !storeId ||
      !name ||
      typeof status !== "boolean" ||
      categoryIndex === undefined
    ) {
      throw new ApiError(400, "All required fields must be provided");
    }

    // Validate store existence
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!store) {
      throw new ApiError(404, "Store not found");
    }

    // name already exists in the store
    const existingCategory = await prisma.category.findFirst({
      where: {
        storeId,
        name,
      },
    });

    if (existingCategory) {
      throw new ApiError(
        400,
        "A category with this name already exists in this store",
      );
    }

    // Create new category
    const newCategory = await prisma.category.create({
      data: {
        storeId,
        name,
        status,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newCategory, "Category added successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    console.log(storeId);
    if (!storeId) {
      throw new ApiError(400, "Store ID is required");
    }
    // Validate store existence
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!store) {
      throw new ApiError(404, "Store not found");
    }
    // Get all categories for the given storeId
    const categories = await prisma.category.findMany({
      where: {
        storeId,
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, categories, "Categories retrieved successfully"),
      );
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { addCategory, getCategories };
