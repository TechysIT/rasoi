import { useEffect, useState } from "react";
import { UserTable } from "@/components/tables/User-list";
import { UserList } from "@/utils/Types";
import { useEmployeeStore } from "@/stores/store";
import NotFound from "@/components/error/NotFound";

export default function ManageSuppliers() {
  const [userList, setUserList] = useState<UserList[]>([]);

  const employee = useEmployeeStore((state) => state.employee);
  console.log("Employee:", employee);
  const storeId = employee?.storeId || "";
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }
  useEffect(() => {
    const fetchEmployees = async () => {
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
      }
    };

    fetchEmployees();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      <UserTable data={userList} />
    </div>
  );
}
