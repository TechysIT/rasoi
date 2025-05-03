// Global imports
import NotFound from "@/components/error/NotFound";
import { DishesManagementTable } from "@/components/tables/Dishes-management";
import { useEmployeeStore } from "@/stores/store";
import { DishesManagementData } from "@/utils/Types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManageSuppliers() {
  const [dishesData, setDishesData] = useState<DishesManagementData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await window.ipc.invoke("getDishes", storeId);

      if (Array.isArray(response)) {
        const filtered = response.filter((dish) => !dish.deletedAt);
        setDishesData(filtered);
      } else {
        setDishesData([]);
      }
      // console.log("Fetched dishes from IPC:", response);
    } catch (error) {
      console.error("Error fetching dishes from ipc:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Failed to load dishes. Please try again.");
    }
  };

  useEffect(() => {
    fetchDishes();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <DishesManagementTable
        data={dishesData}
        refreshPage={() => fetchDishes()}
      />
    </div>
  );
}
