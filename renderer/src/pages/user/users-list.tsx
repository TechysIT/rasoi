import { useEffect, useState, useCallback } from "react";
import { UserTable } from "@/components/tables/User-list";
import { UserList } from "@/utils/Types";
import { useEmployeeStore } from "@/stores/store";
import NotFound from "@/components/error/NotFound";
import { toast } from "sonner";

export default function ManageSuppliers() {
  const [userList, setUserList] = useState<UserList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  const fetchEmployees = useCallback(async () => {
    if (!storeId) return;
    setLoading(true);
    setError(null);
    try {
      const employees: UserList[] = await window.ipc.invoke(
        "getEmployees",
        storeId
      );
      const activeEmployees = employees.filter((user) => !user.deletedAt);
      setUserList(activeEmployees);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setUserList([]);
      setError("Something went wrong. Please try again.");
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  return (
    <div className="container overflow-auto pb-20">
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <UserTable
        data={userList}
        storeId={storeId}
        refreshPage={fetchEmployees}
      />
    </div>
  );
}
