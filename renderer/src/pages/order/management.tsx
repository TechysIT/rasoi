// Global imports
import NotFound from "@/components/error/NotFound";
import { OrderManageTable } from "@/components/tables/Order-management";
import { useEmployeeStore } from "@/stores/store";
import { OrderManageData } from "@/utils/Types";
import React, { useEffect, useState } from "react";

export default function ManageSuppliers() {
  const [orderManageData, setOrderManageData] = useState<OrderManageData[]>([]);

  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const fetchOrders = async () => {
    try {
      const orders: OrderManageData[] = await window.ipc.invoke(
        "getOrders",
        storeId
      );

      const filteredOrders = orders.filter((order) => order.deletedAt === null);
      setOrderManageData(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders via IPC:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container overflow-auto pb-20">
      <OrderManageTable data={orderManageData} />
    </div>
  );
}
