/*
  Warnings:

  - A unique constraint covering the columns `[storeId,index]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "status" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Category_storeId_index_key" ON "Category"("storeId", "index");
