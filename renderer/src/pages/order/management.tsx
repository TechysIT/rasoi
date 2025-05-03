// Global imports
import { OrderManageTable } from "@/components/tables/Order-management";
import { OrderManageData } from "@/utils/Types";
import React, { useEffect, useState } from "react";

export default function ManageSuppliers() {
  const [orderManageData, setOrderManageData] = useState<OrderManageData[]>([]);

  useEffect(() => {
    const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";

    const fetchOrders = async () => {
      try {
        const orders: OrderManageData[] = await window.ipc.invoke(
          "getOrders",
          storeId
        );

        const filteredOrders = orders.filter(
          (order) => order.deletedAt === null
        );
        setOrderManageData(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders via IPC:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container overflow-auto pb-20">
      <OrderManageTable data={orderManageData} />
    </div>
  );
}
