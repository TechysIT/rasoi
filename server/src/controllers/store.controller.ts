import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";
import { StoreRegister } from "../utils/types";

// Store creation
const registerStore = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      logo,
      organizationId,
      taxRate,
      theme,
      printer,
      paperSize,
      updateAvailable,
    }: StoreRegister = req.body;

    // Validate required fields
    if (!name) {
      throw new ApiError(400, "Name is required");
    }
    if (!organizationId) {
      throw new ApiError(400, "Organization ID is required");
    }

    // organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });
    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    // store with the same name exists within the organization
    const existingStore = await prisma.store.findFirst({
      where: {
        organizationId,
        name,
      },
    });

    if (existingStore) {
      throw new ApiError(
        400,
        "A store with this name already exists in the organization",
      );
    }

    // Create store
    const createdStore = await prisma.store.create({
      data: {
        name,
        logo: logo || null,
        organizationId,
        taxRate: taxRate ?? null,
        DeviceSetting: {
          create: {
            theme: theme || null,
            printer: printer || null,
            paperSize: paperSize || null,
            updateAvailable: updateAvailable ?? false,
          },
        },
      },
      include: {
        DeviceSetting: true,
      },
    });

    if (!createdStore) {
      throw new ApiError(500, "Failed to create store");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdStore, "Store created"));
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

const getStores = asyncHandler(async (req, res, next) => {
  try {
    const organizationId = req.headers["organization-id"] as string;

    if (!organizationId) {
      return next(new ApiError(400, "Organization ID is required"));
    }

    const stores = await prisma.store.findMany({
      where: { organizationId },
    });

    if (!stores || stores.length === 0) {
      return next(
        new ApiError(404, "Stores not found for the given organization"),
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, stores, "Stores retrieved successfully"));
  } catch (error: any) {
    next(new ApiError(500, "Internal Server Error", error));
  }
});

export { registerStore, getStores };
