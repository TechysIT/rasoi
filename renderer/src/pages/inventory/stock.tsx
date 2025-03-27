// Global imports
import { useEffect, useState } from "react";
import { InventoryStockTable } from "@/components/tables/Inventory-stock";
import { InventoryStockData } from "@/utils/Types";

export default function ManageSuppliers() {
  const [inventoryData, setInventoryData] = useState<InventoryStockData[]>([]);
  const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await window.ipc.invoke("getInventory", storeId);
        console.log("Fetched Inventory Data:", data);
        setInventoryData(data || []);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      <InventoryStockTable data={inventoryData} />
    </div>
  );
}
