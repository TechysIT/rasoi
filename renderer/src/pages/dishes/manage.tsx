// Global imports
import { DishesManagementTable } from "@/components/tables/Dishes-management";
import { DishesManagementData } from "@/utils/Types";
import React, { useEffect, useState } from "react";

export default function ManageSuppliers() {
  const [dishesData, setDishesData] = useState<DishesManagementData[]>([]);
  const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const result = await window.ipc.invoke("getDishes", storeId);
        if (!result) {
          throw new Error("No data received from IPC");
        }
        console.log("Fetched dishes from IPC:", result);
        setDishesData(result);
      } catch (error) {
        console.error("Error fetching dishes from ipc:", error);
      }
    };

    fetchDishes();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      <DishesManagementTable data={dishesData} />
    </div>
  );
}
