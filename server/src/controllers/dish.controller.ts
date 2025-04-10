import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";

// const addDish = asyncHandler(async (req, res) => {
//   try {
//     const {
//       storeId,
//       name,
//       categoryId,
//       cost,
//       picturePath,
//       createdBy,
//     }: DishRegister = req.body;

//     // Validate required fields
//     if (!storeId || !name || !categoryId || cost === undefined || !createdBy) {
//       throw new ApiError(400, "All required fields must be provided");
//     }

//     // Validate store existence
//     const store = await prisma.store.findUnique({
//       where: { id: storeId },
//     });
//     if (!store) {
//       throw new ApiError(404, "Store not found");
//     }

//     // Validate category existence
//     const category = await prisma.category.findUnique({
//       where: { id: categoryId },
//     });
//     if (!category) {
//       throw new ApiError(404, "Category not found");
//     }

//     // Create new dish
//     const newDish = await prisma.dish.create({
//       data: {
//         storeId,
//         name,
//         categoryId,
//         cost,
//         picture: picturePath || null,
//         createdBy,
//       },
//     });

//     return res
//       .status(201)
//       .json(new ApiResponse(201, newDish, "Dish added successfully"));
//   } catch (error: any) {
//     throw new ApiError(500, "Internal Server Error", error);
//   }
// });

// const addAddon = asyncHandler(async (req, res) => {
//   try {
//     const {
//       storeId,
//       name,
//       variations,
//       mandatory,
//       cost,
//       itemsUsed,
//     }: AddonRegister = req.body;

//     // Validate required fields
//     if (!storeId || !name || mandatory === undefined || cost === undefined) {
//       throw new ApiError(400, "All required fields must be provided");
//     }

//     // Validate store existence
//     const store = await prisma.store.findUnique({
//       where: { id: storeId },
//     });
//     if (!store) {
//       throw new ApiError(404, "Store not found");
//     }

//     // Create new addon
//     const newAddon = await prisma.addon.create({
//       data: {
//         storeId,
//         name,
//         variations: variations || null,
//         mandatory,
//         cost,
//         itemsUsed: itemsUsed || null,
//       },
//     });

//     return res
//       .status(201)
//       .json(new ApiResponse(201, newAddon, "Addon added successfully"));
//   } catch (error: any) {
//     throw new ApiError(500, "Internal Server Error", error);
//   }
// });

// Fetch all Dishes by Store ID

const getDishes = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    if (!storeId) {
      throw new ApiError(400, "Store ID must be provided");
    }
    // Validate store existence
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!store) {
      throw new ApiError(404, "Store not found");
    }
    // Fetch all dishes by Store ID
    const dishes = await prisma.dish.findMany({
      where: { storeId },
    });
    res
      .status(200)
      .json(new ApiResponse(200, dishes, "Dishes retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

// Fetch all Addons by Store ID
const getAddons = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    if (!storeId) {
      throw new ApiError(400, "Store ID must be provided");
    }
    // Validate store existence
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!store) {
      throw new ApiError(404, "Store not found");
    }
    // Fetch all addons by Store ID
    const addons = await prisma.addon.findMany({ where: { storeId } });
    res
      .status(200)
      .json(new ApiResponse(200, addons, "Addons retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { getDishes, getAddons };
