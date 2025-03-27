/*
  Warnings:

  - You are about to drop the column `cost` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `itemsUsed` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `mandatory` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `variations` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `primaryAddress` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updateAvailable` on the `DeviceSetting` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `avatarPath` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoggedIn` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `threshold` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `OrderLog` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `OrderLog` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `taxRate` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `discountType` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the `_AddonToDish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DishToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dishId` to the `Addon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Addon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Addon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `roleId` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `item` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `OrderLog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `OrderLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `reportType` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Role` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `SocialLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Addon" DROP CONSTRAINT "Addon_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_storeId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceSetting" DROP CONSTRAINT "DeviceSetting_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_storeId_fkey";

-- DropForeignKey
ALTER TABLE "OrderLog" DROP CONSTRAINT "OrderLog_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderLog" DROP CONSTRAINT "OrderLog_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_storeId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_storeId_fkey";

-- DropForeignKey
ALTER TABLE "_AddonToDish" DROP CONSTRAINT "_AddonToDish_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddonToDish" DROP CONSTRAINT "_AddonToDish_B_fkey";

-- DropForeignKey
ALTER TABLE "_DishToOrder" DROP CONSTRAINT "_DishToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToOrder" DROP CONSTRAINT "_DishToOrder_B_fkey";

-- DropIndex
DROP INDEX "Addon_storeId_idx";

-- DropIndex
DROP INDEX "Category_storeId_idx";

-- DropIndex
DROP INDEX "Customer_storeId_idx";

-- DropIndex
DROP INDEX "DeviceSetting_storeId_idx";

-- DropIndex
DROP INDEX "Dish_storeId_idx";

-- DropIndex
DROP INDEX "Employee_phone_key";

-- DropIndex
DROP INDEX "Employee_roleId_idx";

-- DropIndex
DROP INDEX "Employee_storeId_idx";

-- DropIndex
DROP INDEX "Inventory_storeId_idx";

-- DropIndex
DROP INDEX "Order_storeId_idx";

-- DropIndex
DROP INDEX "OrderLog_orderId_idx";

-- DropIndex
DROP INDEX "Report_storeId_idx";

-- DropIndex
DROP INDEX "Role_name_key";

-- DropIndex
DROP INDEX "Store_organizationId_idx";

-- AlterTable
ALTER TABLE "Addon" DROP COLUMN "cost",
DROP COLUMN "itemsUsed",
DROP COLUMN "mandatory",
DROP COLUMN "storeId",
DROP COLUMN "variations",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "dishId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "index",
DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "phone",
DROP COLUMN "primaryAddress",
DROP COLUMN "status",
DROP COLUMN "updatedBy",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DeviceSetting" DROP COLUMN "updateAvailable",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "categoryId",
DROP COLUMN "cost",
DROP COLUMN "createdBy",
DROP COLUMN "picture",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "avatarPath",
DROP COLUMN "firstName",
DROP COLUMN "lastLoggedIn",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "phone",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "roleId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "createdBy",
DROP COLUMN "name",
DROP COLUMN "supplier",
DROP COLUMN "threshold",
DROP COLUMN "unit",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "item" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdBy",
DROP COLUMN "employeeId",
DROP COLUMN "orderType",
DROP COLUMN "price",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderLog" DROP COLUMN "storeId",
DROP COLUMN "updatedBy",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "type",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "reportType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions",
DROP COLUMN "storeId",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "SocialLink" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "logo",
DROP COLUMN "taxRate",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "discountType",
DROP COLUMN "expiresAt",
DROP COLUMN "isActive",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_AddonToDish";

-- DropTable
DROP TABLE "_DishToOrder";

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceSetting" ADD CONSTRAINT "DeviceSetting_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLog" ADD CONSTRAINT "OrderLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
