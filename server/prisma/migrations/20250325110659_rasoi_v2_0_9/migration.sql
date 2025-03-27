/*
  Warnings:

  - You are about to drop the column `price` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Dish` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryIndex]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictures` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showOnMenu` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_storeId_fkey";

-- DropIndex
DROP INDEX "Category_storeId_categoryIndex_key";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "price",
DROP COLUMN "storeId",
ADD COLUMN     "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT NOT NULL,
ADD COLUMN     "showOnMenu" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "_DishUsedItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DishUsedItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DishToStore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DishToStore_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DishUsedItems_B_index" ON "_DishUsedItems"("B");

-- CreateIndex
CREATE INDEX "_DishToStore_B_index" ON "_DishToStore"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryIndex_key" ON "Category"("categoryIndex");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishUsedItems" ADD CONSTRAINT "_DishUsedItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishUsedItems" ADD CONSTRAINT "_DishUsedItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToStore" ADD CONSTRAINT "_DishToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToStore" ADD CONSTRAINT "_DishToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
