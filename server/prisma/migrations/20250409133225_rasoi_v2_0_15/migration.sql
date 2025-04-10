/*
  Warnings:

  - You are about to drop the column `categoryIndex` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `merged` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `mergedFrom` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `reservationDescription` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `reservationEmail` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `reservationName` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `reservationPhone` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `reservationTime` on the `TableList` table. All the data in the column will be lost.
  - Made the column `threshold` on table `Inventory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `TableList` table without a default value. This is not possible if the table is not empty.
  - Made the column `storeId` on table `TableList` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Addon" DROP CONSTRAINT "Addon_dishId_fkey";

-- DropForeignKey
ALTER TABLE "Addon" DROP CONSTRAINT "Addon_storeId_fkey";

-- DropForeignKey
ALTER TABLE "DishInventory" DROP CONSTRAINT "DishInventory_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishInventory" DROP CONSTRAINT "DishInventory_inventoryItemId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_storeId_fkey";

-- DropForeignKey
ALTER TABLE "TableList" DROP CONSTRAINT "TableList_storeId_fkey";

-- DropIndex
DROP INDEX "Category_categoryIndex_key";

-- AlterTable
ALTER TABLE "Addon" ALTER COLUMN "dishId" DROP NOT NULL,
ALTER COLUMN "storeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "categoryIndex";

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "addOns" DROP NOT NULL,
ALTER COLUMN "addOns" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "createdBy" TEXT,
ALTER COLUMN "storeId" DROP NOT NULL,
ALTER COLUMN "threshold" SET NOT NULL,
ALTER COLUMN "createdById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TableList" DROP COLUMN "deletedAt",
DROP COLUMN "merged",
DROP COLUMN "mergedFrom",
DROP COLUMN "reservationDescription",
DROP COLUMN "reservationEmail",
DROP COLUMN "reservationName",
DROP COLUMN "reservationPhone",
DROP COLUMN "reservationTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "storeId" SET NOT NULL;

-- DropEnum
DROP TYPE "TableStatus";

-- AddForeignKey
ALTER TABLE "DishInventory" ADD CONSTRAINT "DishInventory_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishInventory" ADD CONSTRAINT "DishInventory_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableList" ADD CONSTRAINT "TableList_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
