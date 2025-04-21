
import { useEffect, useState } from "react";
import { UserTable } from "@/components/tables/User-list";
import { UserList } from "@/utils/Types";

export default function ManageSuppliers() {
  const [userList, setUserList] = useState<UserList[]>([]);
  const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees: UserList[] = await window.ipc.invoke(
          "getEmployees",
          storeId
        );
        setUserList(employees);
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
