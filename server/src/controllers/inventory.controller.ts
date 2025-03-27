import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";
import { InventoryRegister } from "../utils/types";

const addInventory = asyncHandler(async (req, res) => {
  try {
    const {
      storeId,
      name,
      quantity,
      threshold,
      createdBy,
      supplier,
    }: InventoryRegister = req.body;

    // Validate required fields
    if (!storeId || !name || !quantity || !createdBy) {
      throw new ApiError(400, "Missing required fields.");
    }

    // Validate store existence
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      throw new ApiError(404, "Store not found.");
    }

    // Validate user existence and role
    const user = await prisma.employee.findUnique({
      where: { id: createdBy },
      include: { role: true }, // Ensure role is fetched
    });

    if (!user || !user.role) {
      throw new ApiError(404, "User or role not found.");
    }

    // Check if user has permission to add inventory
    const hasPermission = await prisma.role.findFirst({
      where: {
        id: user.roleId,
      },
    });

    if (!hasPermission) {
      throw new ApiError(403, "You don't have permission to add inventory.");
    }

    // Check if the inventory item already exists
    const existingInventory = await prisma.inventory.findFirst({
      where: { storeId, name },
    });

    if (existingInventory) {
      throw new ApiError(400, "Inventory item with this name already exists.");
    }

    // Create new inventory item
    // const newInventory = await prisma.inventory.create({
    //   data: {
    //     storeId,
    //     name,
    //     quantity,
    //     threshold: threshold ?? 0,
    //     supplier,
    //     createdBy,
    //   },
    // });

    return res.status(201).json(
      new ApiResponse(
        201,
        // newInventory,
        "Inventory item added successfully.",
      ),
    );
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

// Fetch all Inventory Items by Store ID
const getInventory = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;

    // Validate store existence
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      throw new ApiError(404, "Store not found.");
    }

    const inventory = await prisma.inventory.findMany({ where: { storeId } });
    if (!inventory) {
      throw new ApiError(404, "Inventory not found.");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, inventory, "Inventory retrieved successfully"),
      );
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});
export { addInventory, getInventory };
