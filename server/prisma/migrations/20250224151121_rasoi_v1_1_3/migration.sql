-- CreateTable
CREATE TABLE "DeviceSetting" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "printer" TEXT NOT NULL,
    "paperSize" TEXT NOT NULL,
    "updateAvailable" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeviceSetting_storeId_idx" ON "DeviceSetting"("storeId");

-- AddForeignKey
ALTER TABLE "DeviceSetting" ADD CONSTRAINT "DeviceSetting_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
