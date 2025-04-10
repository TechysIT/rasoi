import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../db/db";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomerStatus } from "@prisma/client";
import { CustomerRegister } from "../utils/types";

// const addCustomer = asyncHandler(async (req, res) => {
//   try {
//     const {
//       storeId,
//       name,
//       email,
//       phone,
//       status,
//       updatedBy,
//       primaryAddress,
//     }: CustomerRegister = req.body;

//     // email or phone
//     if (!email && !phone) {
//       throw new ApiError(400, "Email or phone number is required");
//     }

//     // Validate store
//     const store = await prisma.store.findUnique({
//       where: { id: storeId },
//     });
//     if (!store) {
//       throw new ApiError(404, "Store not found");
//     }

//     // Check for duplicate email or phone within the same store
//     const existingCustomer = await prisma.customer.findFirst({
//       where: {
//         storeId,
//         OR: [email ? { email } : {}, phone ? { phone } : {}],
//       },
//     });

//     if (existingCustomer) {
//       throw new ApiError(
//         400,
//         "A customer with this email or phone already exists in this store",
//       );
//     }

//     // Create new customer
//     const newCustomer = await prisma.customer.create({
//       data: {
//         storeId,
//         name,

//         email: email || null,
//         phone: phone || null,
//         status: status || CustomerStatus.ACTIVE,
//         updatedBy: updatedBy || null,
//         createdBy: updatedBy || null,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//         lastLogin: null,

//         primaryAddress: primaryAddress || null,
//       },
//     });

//     if (!newCustomer) {
//       throw new ApiError(500, "Failed to add customer");
//     }

//     return res
//       .status(201)
//       .json(new ApiResponse(201, newCustomer, "Customer added successfully"));
//   } catch (error: any) {
//     throw new ApiError(500, "Internal Server Error", error);
//   }
// });

const getCustomers = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const customers = await prisma.customer.findMany({ where: { storeId } });
    res
      .status(200)
      .json(
        new ApiResponse(200, customers, "Customers retrieved successfully"),
      );
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { getCustomers };
