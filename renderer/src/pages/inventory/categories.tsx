import { useEffect, useState } from "react";
import { InventoryCategoryTable } from "@/components/tables/Inventory-categories";
import { InventoryCategoryData } from "@/utils/Types";
import { toast } from "sonner";

export default function ManageCategories() {
  const [categories, setCategories] = useState<InventoryCategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";
  useEffect(() => {
    if (!storeId) return;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await window.ipc.invoke("getCategories", storeId);
        console.log(response);
        if (Array.isArray(response)) {
          setCategories(response);
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

    fetchCategories();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <InventoryCategoryTable data={categories} />
    </div>
  );
}
