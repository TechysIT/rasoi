import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";
import { RoleRegister } from "../utils/types";

// Create a new role
const createRole = asyncHandler(async (req, res) => {
  try {
    const { name, permissions, storeId }: RoleRegister = req.body;

    // Validate required fields
    if (!name || !permissions || !storeId) {
      throw new ApiError(400, "All required fields must be provided");
    }

    // Check if the role name already exists
    const existingRole = await prisma.role.findUnique({ where: { name } });
    if (existingRole) {
      throw new ApiError(400, "Role name already exists");
    }

    // Validate store existence
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    if (!store) {
      throw new ApiError(404, "Store not found");
    }

    // Create new role
    const newRole = await prisma.role.create({
      data: {
        name,
        // permissions,
        storeId,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newRole, "Role created successfully"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

// Fetch all roles for a store
const getRoles = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    console.log("Store ID:", storeId);

    if (!storeId) {
      throw new ApiError(400, "Store ID is required");
    }

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new ApiError(404, "Store not found");
    }

    const roles = await prisma.role.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, roles, "Roles fetched successfully"));
  } catch (error: any) {
    console.error("Error fetching roles:", error);
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { createRole, getRoles };
