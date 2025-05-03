/*
  Warnings:

  - You are about to drop the column `popularFoodItem` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `repeatCustomer` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "popularFoodItem",
DROP COLUMN "repeatCustomer";
