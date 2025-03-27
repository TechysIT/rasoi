/*
  Warnings:

  - You are about to drop the `_DishToStore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storeId` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DishToStore" DROP CONSTRAINT "_DishToStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToStore" DROP CONSTRAINT "_DishToStore_B_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "storeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_DishToStore";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
