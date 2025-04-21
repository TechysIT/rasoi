// Global imports
import { UserRolesTable } from "@/components/tables/User-roles";
import { UserRoles } from "@/utils/Types";
import React, { useEffect, useState } from "react";

export default function ManageSuppliers() {
  const [userRoles, setUserRoles] = useState<UserRoles[]>([]);

  const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";

  const getRolesByStore = async (storeId: string) => {
    try {
      const roles = await window.ipc.invoke("getRoles", storeId);
      return roles;
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
