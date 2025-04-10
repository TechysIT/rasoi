/*
  Warnings:

  - You are about to drop the column `addedOn` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `pictures` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `showOnMenu` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TableList` table. All the data in the column will be lost.
  - You are about to drop the `_DishUsedItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TableStatus" AS ENUM ('available', 'reserved', 'occupied', 'merged');

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_storeId_fkey";

-- DropForeignKey
ALTER TABLE "TableList" DROP CONSTRAINT "TableList_storeId_fkey";

-- DropForeignKey
ALTER TABLE "_DishUsedItems" DROP CONSTRAINT "_DishUsedItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishUsedItems" DROP CONSTRAINT "_DishUsedItems_B_fkey";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "addedOn",
DROP COLUMN "cost",
DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "pictures",
DROP COLUMN "showOnMenu",
DROP COLUMN "updatedAt",
ADD COLUMN     "addOns" TEXT[],
ADD COLUMN     "bowls" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "itemDetails" TEXT,
ADD COLUMN     "persons" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "storeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TableList" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "merged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mergedFrom" INTEGER[],
ADD COLUMN     "reservationDescription" TEXT,
ADD COLUMN     "reservationEmail" TEXT,
ADD COLUMN     "reservationName" TEXT,
ADD COLUMN     "reservationPhone" TEXT,
ADD COLUMN     "reservationTime" TIMESTAMP(3),
ALTER COLUMN "storeId" DROP NOT NULL;

-- DropTable
DROP TABLE "_DishUsedItems";

-- CreateTable
CREATE TABLE "DishInventory" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "defaultSelected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DishInventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishInventory" ADD CONSTRAINT "DishInventory_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishInventory" ADD CONSTRAINT "DishInventory_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableList" ADD CONSTRAINT "TableList_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
