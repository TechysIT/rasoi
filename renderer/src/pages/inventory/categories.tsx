import { useEffect, useState } from "react";
import { InventoryCategoryTable } from "@/components/tables/Inventory-categories";
import { InventoryCategoryData } from "@/utils/Types";
import { toast } from "sonner";
import { useEmployeeStore } from "@/stores/store";
import NotFound from "@/components/error/NotFound";

export default function ManageCategories() {
  const [categories, setCategories] = useState<InventoryCategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await window.ipc.invoke("getCategories", storeId);
      if (Array.isArray(response)) {
        const filtered = response.filter((cat) => !cat.deletedAt);
        setCategories(filtered);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Something went wrong. Please try again.");
      toast.error("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <InventoryCategoryTable
        data={categories}
        refreshPage={() => fetchCategories()}
      />
    </div>
  );
}
