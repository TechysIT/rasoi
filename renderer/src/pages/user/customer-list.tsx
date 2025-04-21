"use client";

import React, { useEffect, useState } from "react";
import { UserCustomerTable } from "@/components/tables/User-customer";
import { CustomerData } from "@/utils/Types";

export default function ManageSuppliers() {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await window.ipc.invoke("getCustomers", storeId);
        setCustomerData(customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container overflow-auto pb-20">
      <UserCustomerTable data={customerData} />
    </div>
  );
}
