"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import React from "react";

type OrderStatus = "New" | "Processing" | "Completed" | "Canceled";

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
}

interface NotificationItem {
  orderId: string;
  items: string[];
}

const orders: Order[] = [
  {
    id: "ABC123abc",
    items: [
      { name: "Burger", quantity: 2 },
      { name: "Cheese", quantity: 1 },
      { name: "Beef", quantity: 1 },
    ],
    status: "New",
  },
  {
    id: "ABC123abc",
    items: [
      { name: "Cheese", quantity: 2 },
      { name: "Beef", quantity: 1 },
      { name: "Chicken", quantity: 1 },
    ],
    status: "Processing",
  },
  {
    id: "ABC123abc",
    items: [
      { name: "Beef", quantity: 1 },
      { name: "Boba", quantity: 2 },
    ],
    status: "Completed",
  },
  {
    id: "ABC123abc",
    items: [
      { name: "Chicken", quantity: 1 },
      { name: "Burger", quantity: 2 },
      { name: "Cola", quantity: 1 },
    ],
    status: "Canceled",
  },
  {
    id: "ABC123abc",
    items: [
      { name: "Fried Fries", quantity: 2 },
      { name: "Chicken", quantity: 1 },
    ],
    status: "Completed",
  },
  {
    id: "ABC123abc",
    items: [{ name: "Coca cola", quantity: 1 }],
    status: "Canceled",
  },
  {
    id: "ABC123abc",
    items: [
      { name: "Cream", quantity: 1 },
      { name: "Beef", quantity: 2 },
    ],
    status: "New",
  },
  {
    id: "ABC123abc",
    items: [
      { name: "Boba", quantity: 1 },
      { name: "Cream", quantity: 2 },
    ],
    status: "Processing",
  },
];

const notifications: NotificationItem[] = [
  {
    orderId: "ABC123abc",
    items: ["Chicken Curry x1", "Aloo Gobi x1", "Rogan Josh x2"],
  },
  {
    orderId: "ABC123abc",
    items: ["Aloo Gobi x1", "Rogan Josh x2"],
  },
  {
    orderId: "ABC123abc",
    items: ["Chicken Curry x1", "Aloo Gobi x1", "Rogan Josh x2"],
  },
  {
    orderId: "ABC123abc",
    items: ["Chicken Curry x1", "Aloo Gobi x1", "Rogan Josh x2"],
  },
];

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge
      className={cn(
        "w-28 justify-between",
        status === "New" && "bg-customPrimary-500 hover:bg-customPrimary-500",
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
  const [orderCount] = useState(12);
  const [completedCount] = useState(10);
  const [totalOrders] = useState(20);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="w-full mx-auto p-6 container">
        <h1 className="text-2xl font-semibold text-customPrimary-500 text-center mb-6">
          Kitchen Display
        </h1>

        <div className="grid grid-cols-3 mb-8 text-sm">
          <div>Date: 06/01/2025</div>
          <div className="text-center">Order in Queue: {orderCount}</div>
          <div className="text-right">
            Total Completed Order: {completedCount}/{totalOrders}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-customPrimary-500 font-medium mb-4">
              Order Details
            </h2>
            <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 text-sm">
              <div className="text-customPrimary-500">ID</div>
              <div className="text-customPrimary-500">Orders</div>
              <div className="text-customPrimary-500">Status</div>

              {orders.map((order, index) => (
                <React.Fragment key={index}>
                  <div className="font-medium">{order.id}</div>
                  <div>{formatItems(order.items)}</div>
                  <div>
                    <StatusBadge status={order.status} />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-customPrimary-500 font-medium mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="space-y-2">
                  <div className="bg-customPrimary-500 text-white p-2 rounded">
                    Order ID: {notification.orderId}
                  </div>
                  <div className="pl-2 space-y-1">
                    {notification.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm">
                        Item List: {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
