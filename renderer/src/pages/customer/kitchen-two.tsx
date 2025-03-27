"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderCard } from "@/components/Kitchen-order-card";

type OrderStatus = "New" | "Processing" | "Completed" | "Canceled";
type Priority = "High" | "Medium" | "Low";

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  note: string;
  placedAt: string;
  priority: Priority;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: "ABC123abc",
    items: [
      { name: "Chicken Curry", quantity: 1 },
      { name: "Aloo Gobi", quantity: 1 },
      { name: "Rogan Josh", quantity: 2 },
      { name: "Biryani Rice", quantity: 3 },
    ],
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    placedAt: "06/01/2025 at 08:49 PM",
    priority: "High",
    status: "New",
  },
  {
    id: "ABC123abc",
    items: [
      { name: "Chicken Curry", quantity: 1 },
      { name: "Aloo Gobi", quantity: 1 },
      { name: "Rogan Josh", quantity: 2 },
      { name: "Biryani Rice", quantity: 3 },
    ],
    note: "N/A",
    placedAt: "06/01/2025 at 08:49 PM",
    priority: "High",
    status: "Processing",
  },
  // Add more sample orders here...
];

const statusFilters: OrderStatus[] = [
  "New",
  "Processing",
  "Completed",
  "Canceled",
];

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge
      className={cn(
        "w-28 justify-between",
        status === "New" && "bg-orange-500 hover:bg-orange-500",
        status === "Processing" && "bg-blue-500 hover:bg-blue-500",
        status === "Completed" && "bg-green-500 hover:bg-green-500",
        status === "Canceled" && "bg-red-500 hover:bg-red-500"
      )}
    >
      {status}
      <ChevronDown className="h-4 w-4" />
    </Badge>
  );
}

function formatItems(items: OrderItem[]): string {
  return items.map((item) => `${item.name} (${item.quantity})`).join(", ");
}

export default function KitchenDisplay() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "All">(
    "All"
  );
  const [orderCount] = useState(12);
  const [completedCount] = useState(10);
  const [totalOrders] = useState(20);

  const filteredOrders = orders.filter((order) =>
    selectedStatus === "All" ? true : order.status === selectedStatus
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-orange-500 text-center mb-6">
          Kitchen Display
        </h1>

        <div className="grid grid-cols-3 mb-8 text-sm">
          <div>Date: 06/01/2025</div>
          <div className="text-center">Order in Queue: {orderCount}</div>
          <div className="text-right">
            Total Completed Order: {completedCount}/{totalOrders}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === "All" ? "default" : "ghost"}
              onClick={() => setSelectedStatus("All")}
              className={
                selectedStatus === "All"
                  ? "bg-orange-500 hover:bg-orange-500"
                  : ""
              }
            >
              All
            </Button>
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "ghost"}
                onClick={() => setSelectedStatus(status)}
                className={
                  selectedStatus === status
                    ? cn(
                        status === "New" && "bg-orange-500 hover:bg-orange-500",
                        status === "Processing" &&
                          "bg-blue-500 hover:bg-blue-500",
                        status === "Completed" &&
                          "bg-green-500 hover:bg-green-500",
                        status === "Canceled" && "bg-red-500 hover:bg-red-500"
                      )
                    : ""
                }
              >
                {status}
              </Button>
            ))}
          </div>

          <Button variant="outline" className="text-orange-500">
            Sort by Priority
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>

        {/* Old Order Details Section - Removed */}
        {/* <div className="grid md:grid-cols-2 gap-6"> */}
        {/*   <div className="bg-white rounded-lg shadow p-4"> */}
        {/*     <h2 className="text-orange-500 font-medium mb-4">Order Details</h2> */}
        {/*     <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 text-sm"> */}
        {/*       <div className="text-orange-500">ID</div> */}
        {/*       <div className="text-orange-500">Orders</div> */}
        {/*       <div className="text-orange-500">Status</div> */}

        {/*       {orders.map((order, index) => ( */}
        {/*         <React.Fragment key={index}> */}
        {/*           <div className="font-medium">{order.id}</div> */}
        {/*           <div>{formatItems(order.items)}</div> */}
        {/*           <div> */}
        {/*             <StatusBadge status={order.status} /> */}
        {/*           </div> */}
        {/*         </React.Fragment> */}
        {/*       ))} */}
        {/*     </div> */}
        {/*   </div> */}

        {/* </div> */}
      </div>
    </div>
  );
}
