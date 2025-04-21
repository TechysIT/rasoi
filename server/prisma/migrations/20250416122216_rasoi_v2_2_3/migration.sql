/*
  Warnings:

  - You are about to drop the column `kithiManagement` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "kithiManagement",
ADD COLUMN     "kitchenManagement" BOOLEAN NOT NULL DEFAULT false;
