// Global imports
import { DishesAddonsTable } from "@/components/tables/Dishes-addOns";
import { AddOnsTypes } from "@/utils/Types";
import React, { useEffect, useState } from "react";

export default function ManageAddOns() {
  // Add state for storing the addons data
  const [addOnsData, setAddOnsData] = useState<AddOnsTypes[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";
        const response = await window.ipc.invoke("getAddonsByStoreId", storeId);
        setAddOnsData(response);
        console.log("Fetched Addons Data:", response);
      } catch (error) {
        console.error("Failed to fetch addons:", error);
      }
    };

    fetchAddons();
  }, []);

  return (
    <div className="container overflow-auto pb-20">
      <DishesAddonsTable data={addOnsData} />
    </div>
  );
}
