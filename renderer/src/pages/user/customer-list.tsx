import React, { useEffect, useState } from "react";
import { UserCustomerTable } from "@/components/tables/User-customer";
import { CustomerData } from "@/utils/Types";
import { useEmployeeStore } from "@/stores/store";
import NotFound from "@/components/error/NotFound";

export default function ManageSuppliers() {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const fetchCustomers = async () => {
    try {
      const customers: CustomerData[] = await window.ipc.invoke(
        "getCustomers",
        storeId
      );
      const activeCustomers = customers.filter(
        (customer) => !customer.deletedAt
      );
      setCustomerData(activeCustomers);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [storeId]);

  return (
    <div className="container overflow-auto pb-20">
      <UserCustomerTable data={customerData} />
    </div>
  );
}
