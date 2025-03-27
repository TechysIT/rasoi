// Global imports
import { OrderManageTable } from "@/components/tables/Order-management";
import { OrderManageData, OrderStatus, OrderType } from "@/utils/Types";
import React from "react";
// Local imports

const orderManageData: OrderManageData[] = [
  {
    id: "ORD001",
    status: OrderStatus.PROCESSING,
    orderType: OrderType.DINE_IN,
    dateTime: "2025-01-25 12:30 PM",
    updatedOn: "2025-01-25 12:45 PM",
    dishes: [
      { name: "Margherita Pizza", quantity: 1 },
      { name: "Caesar Salad", quantity: 2 },
    ],
    price: 18.99,
    customerName: "John Doe",
    createdBy: "Admin",
  },
  {
    id: "ORD002",
    status: OrderStatus.DELIVERED,
    orderType: OrderType.DELIVERY,
    dateTime: "2025-01-25 01:00 PM",
    updatedOn: "2025-01-25 01:30 PM",
    dishes: [
      { name: "Spaghetti Bolognese", quantity: 1 },
      { name: "Garlic Bread", quantity: 1 },
    ],
    price: 22.5,
    customerName: "Jane Smith",
    createdBy: "Admin",
  },
  {
    id: "ORD003",
    status: OrderStatus.REMOVED,
    orderType: OrderType.TAKEAWAY,
    dateTime: "2025-01-25 02:15 PM",
    updatedOn: "2025-01-25 02:20 PM",
    dishes: [{ name: "Chicken Burger", quantity: 2 }],
    price: 15.75,
    customerName: "Michael Brown",
    createdBy: "Staff",
  },
  {
    id: "ORD004",
    status: OrderStatus.PROCESSING,
    orderType: OrderType.DELIVERY,
    dateTime: "2025-01-25 03:10 PM",
    updatedOn: "2025-01-25 03:20 PM",
    dishes: [
      { name: "Sushi Platter", quantity: 1 },
      { name: "Miso Soup", quantity: 1 },
    ],
    price: 30.99,
    customerName: "Emily Davis",
    createdBy: "Admin",
  },
  {
    id: "ORD005",
    status: OrderStatus.DELIVERED,
    orderType: OrderType.DINE_IN,
    dateTime: "2025-01-25 04:00 PM",
    updatedOn: "2025-01-25 04:30 PM",
    dishes: [
      { name: "Steak", quantity: 1 },
      { name: "Mashed Potatoes", quantity: 1 },
    ],
    price: 42.0,
    customerName: "David White",
    createdBy: "Manager",
  },
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <OrderManageTable data={orderManageData} />
    </div>
  );
}
