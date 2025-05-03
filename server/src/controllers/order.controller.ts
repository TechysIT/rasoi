import { prisma } from "../db/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getOrders = asyncHandler(async (req, res) => {
  // try {
  //   const storeId = req.params.storeId;
  //   if (!storeId) {
  //     throw new ApiError(400, "Store ID must be provided");
  //   }
  //   const store = await prisma.store.findUnique({
  //     where: { id: storeId },
  //   });
  //   if (!store) {
  //     throw new ApiError(404, "Store not found");
  //   }
  //   const orders = await prisma.order.findMany({
  //     where: { storeId },
  //     include: {
  //       OrderItems: {
  //         include: {
  //           dish: true,
  //           OrderItemAddons: {
  //             include: {
  //               addon: true,
  //             },
  //           },
  //         },
  //       },
  //       customer: true,
  //       employee: true,
  //     },
  //   });
  //   const formattedOrders = orders.map((order) => ({
  //     ...order,
  //     OrderItems: order.OrderItems.map((item) => ({
  //       ...item,
  //       dish: item.dish,
  //       OrderItemAddons: item.OrderItemAddons.map((addon) => ({
  //         ...addon,
  //         addon: addon.addon,
  //       })),
  //     })),
  //     customer: order.customer,
  //   }));
  //   res
  //     .status(200)
  //     .json(
  //       new ApiResponse(200, formattedOrders, "Orders retrieved successfully"),
  //     );
  // } catch (error: any) {
  //   throw new ApiError(500, "Internal Server Error", error);
  // }
});

export { getOrders };
