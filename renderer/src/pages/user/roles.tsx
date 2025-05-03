// Global imports
import NotFound from "@/components/error/NotFound";
import { UserRolesTable } from "@/components/tables/User-roles";
import { useEmployeeStore } from "@/stores/store";
import { UserRoles } from "@/utils/Types";
import React, { useEffect, useState } from "react";

export default function ManageSuppliers() {
  const [userRoles, setUserRoles] = useState<UserRoles[]>([]);

  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const getRolesByStore = async (storeId: string) => {
    try {
      const roles = await window.ipc.invoke("getRoles", storeId);
      const activeRoles = roles.filter((role: any) => role.deletedAt === null);
      return activeRoles;
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      return [];
    }
  };
  
  useEffect(() => {
    getRolesByStore(storeId).then(setUserRoles);
  }, [storeId]);
  
  return (
    <div className="container overflow-auto pb-20">
      <UserRolesTable data={userRoles} />
    </div>
  );
}
