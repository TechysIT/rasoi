// Global imports
import NotFound from "@/components/error/NotFound";
import { DishesAddonsTable } from "@/components/tables/Dishes-addOns";
import { useEmployeeStore } from "@/stores/store";
import { AddOnsTypes } from "@/utils/Types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManageAddOns() {
  const [addOnsData, setAddOnsData] = useState<AddOnsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const fetchAddons = async () => {
    setLoading(true);
    try {
      const response = await window.ipc.invoke("getAddonsByStoreId", storeId);
      if (Array.isArray(response)) {
        const filtered = response.filter((cat) => !cat.deletedAt);
        setAddOnsData(filtered);
      } else {
        setAddOnsData([]);
      }
    } catch (error) {
      console.error("Failed to fetch addons:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Failed to load addons. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddons();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <DishesAddonsTable data={addOnsData} refreshPage={() => fetchAddons()} />
    </div>
  );
}
