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
      where: {
        storeId,
        category: {
          deletedAt: null,
        },
      },
      include: {
        category: true,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, dishes, "Dishes retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

// Fetch all Addons by dish ID
const getAddons = asyncHandler(async (req, res) => {
  try {
    const dishId = req.params.dishId;
    if (!dishId) {
      throw new ApiError(400, "Dish ID must be provided");
    }
    // Validate dish existence
    const dish = await prisma.dish.findUnique({
      where: { id: dishId },
    });

    if (!dish) {
      throw new ApiError(404, "Dish not found");
    }
    // Fetch all addons by dish ID
    const addons = await prisma.addon.findMany({ where: { dishId } });
    res
      .status(200)
      .json(new ApiResponse(200, addons, "Addons retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

// get adons by storeId
const getAddonsByStoreId = asyncHandler(async (req, res) => {
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
    // Fetch all addons by store ID
    const addons = await prisma.addon.findMany({ where: { storeId } });
    res
      .status(200)
      .json(new ApiResponse(200, addons, "Addons retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

// get dish invetory

const getDishInventory = asyncHandler(async (req, res) => {
  try {
    const dishId = req.params.dishId;

    if (!dishId) {
      throw new ApiError(400, "Dish ID must be provided");
    }
    // Validate dish existence
    const dish = await prisma.dish.findUnique({
      where: { id: dishId },
    });
    if (!dish) {
      throw new ApiError(404, "Dish not found");
    }
    // Fetch all dishes by Dish ID
    const dishes = await prisma.dishInventory.findMany({
      where: { dishId },
    });
    res
      .status(200)
      .json(new ApiResponse(200, dishes, "Dishes retrieved successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

//delete dish
const deleteDish = asyncHandler(async (req, res) => {
  try {
    const dishId = req.params.id;
    if (!dishId) {
      throw new ApiError(400, "Dish ID must be provided");
    }

    // Validate dish existence
    const dish = await prisma.dish.findUnique({
      where: { id: dishId },
    });
    if (!dish) {
      throw new ApiError(404, "Dish not found");
    }

    const deletedAt = new Date();

    // Soft delete the Dish
    await prisma.dish.update({
      where: { id: dishId },
      data: { deletedAt },
    });

    // Soft delete related Addons
    await prisma.addon.updateMany({
      where: { dishId },
      data: { deletedAt },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Dish and related addons deleted successfully",
        ),
      );
  } catch (error: any) {
    console.error(error);
    throw new ApiError(500, "Internal Server Error", error);
  }
});

//delete addon
const deleteAddon = asyncHandler(async (req, res) => {
  try {
    const addonId = req.params.id;
    if (!addonId) {
      throw new ApiError(400, "Addon ID must be provided");
    }

    // Validate addon existence
    const addon = await prisma.addon.findUnique({
      where: { id: addonId },
    });
    if (!addon) {
      throw new ApiError(404, "Addon not found");
    }

    const deletedAt = new Date();

    // Soft delete the Addon
    await prisma.addon.update({
      where: { id: addonId },
      data: { deletedAt },
    });

    res
      .status(200)
      .json(new ApiResponse(200, null, "Addon deleted successfully"));
  } catch (error: any) {
    console.error(error);
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export {
  getDishes,
  getAddons,
  getDishInventory,
  getAddonsByStoreId,
  deleteDish,
  deleteAddon,
};
