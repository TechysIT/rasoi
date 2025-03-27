/*
  Warnings:

  - You are about to drop the column `permissions` on the `Role` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions",
ADD COLUMN     "cashManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "inventoryManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kithiManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "menuManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orderManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reportManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roleManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "settingManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "storeId" TEXT NOT NULL,
ADD COLUMN     "supplierManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userManagement" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
