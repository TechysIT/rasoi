/*
  Warnings:

  - You are about to drop the column `index` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId,categoryIndex]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryIndex` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_storeId_index_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "index",
ADD COLUMN     "categoryIndex" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_storeId_categoryIndex_key" ON "Category"("storeId", "categoryIndex");
