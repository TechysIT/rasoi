// Global imports

import { UserCustomerTable } from "@/components/tables/User-customer";

import { CustomerData, OrderStatus } from "@/utils/Types";

import React from "react";

export const customerData: CustomerData[] = [
  {
    id: "ORD12345",
    name: "Jane Cooper",
    orders: [
      { item: "Burger", quantity: 2 },
      { item: "Cheese", quantity: 1 },
      { item: "Beef", quantity: 1 },
    ],
    createdAt: "13/08/2024 at 04:34 PM",
    status: OrderStatus.PROCESSING,
    createdBy: "Jane Cooper",
    updatedBy: "Jane Cooper",
  },
  {
    id: "ORD12346",
    name: "Wade Warren",
    orders: [
      { item: "Cheese", quantity: 2 },
      { item: "Beef", quantity: 1 },
      { item: "Chicken", quantity: 1 },
    ],
    createdAt: "13/08/2024 at 04:34 PM",
    status: OrderStatus.DELIVERED,
    createdBy: "Wade Warren",
    updatedBy: "Wade Warren",
  },
  {
    id: "ORD12347",
    name: "Cameron Williamson",
    orders: [
      { item: "Beef", quantity: 1 },
      { item: "Boba", quantity: 2 },
    ],
    createdAt: "13/08/2024 at 04:34 PM",
    status: OrderStatus.PROCESSING,
    createdBy: "Cameron Williamson",
    updatedBy: "Cameron Williamson",
  },
  {
    id: "ORD12348",
    name: "Brooklyn Simmons",
    orders: [
      { item: "Chicken", quantity: 1 },
      { item: "Burger", quantity: 2 },
      { item: "Cola", quantity: 1 },
    ],
    createdAt: "13/08/2024 at 04:34 PM",
    status: OrderStatus.REMOVED,
    createdBy: "Brooklyn Simmons",
    updatedBy: "Brooklyn Simmons",
  },
  {
    id: "ORD12349",
    name: "Leslie Alexander",
    orders: [
      { item: "Fried Fries", quantity: 2 },
      { item: "Chicken", quantity: 1 },
    ],
    createdAt: "13/08/2024 at 04:34 PM",
    status: OrderStatus.REMOVED,
    createdBy: "Leslie Alexander",
    updatedBy: "Leslie Alexander",
  },
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <UserCustomerTable data={customerData} />
    </div>
  );
}
