// Global imports
import { useEffect, useState } from "react";
import { InventoryStockTable } from "@/components/tables/Inventory-stock";
import { InventoryStockData } from "@/utils/Types";
import { useEmployeeStore } from "@/stores/store";
import NotFound from "@/components/error/NotFound";

export default function ManageSuppliers() {
  const [inventoryData, setInventoryData] = useState<InventoryStockData[]>([]);

  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const fetchInventory = async () => {
    try {
      const data = await window.ipc.invoke("getInventory", storeId);
      console.log("Fetched Inventory Data:", data);
      setInventoryData(data || []);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      <InventoryStockTable data={inventoryData} />
    </div>
  );
}
