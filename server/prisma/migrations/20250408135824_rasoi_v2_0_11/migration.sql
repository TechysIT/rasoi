-- CreateTable
CREATE TABLE "TableList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "chairs" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TableList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TableList" ADD CONSTRAINT "TableList_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
