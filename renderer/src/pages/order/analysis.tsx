// Global imports
import { OrderAnalysisTable } from "@/components/tables/Order-analysis";

import {
  OrderStatus,
  OrderType,
  DeliveryStatus,
  OrderAnalysisData,
} from "@/utils/Types";
import React from "react";

// Local imports
const orderAnalysisData: OrderAnalysisData[] = [
  {
    id: "ORD001",
    dateTime: "2025-01-25 12:30 PM",
    orderType: OrderType.DINE_IN,
    customerName: "John Doe",
    customerContact: "+44 7895 123456",
    dishes: [
      { name: "Margherita Pizza", quantity: 2 },
      { name: "Caesar Salad", quantity: 1 },
    ],
    status: OrderStatus.PROCESSING,
    amount: 24.99,
    paymentStatus: "Paid",
    peakAt: "Lunch",
    popularFoodItem: "Margherita Pizza",
    repeatCustomer: true,
    feedbackScore: 4.5,
    profitMargin: 30.2,
    assignedStaff: "Emma Watson",
    deliveryStatus: DeliveryStatus.PENDING,
    notes: "Extra cheese on pizza",
    updatedOn: "2025-01-25 01:00 PM",
    createdBy: "Admin",
  },
  {
    id: "ORD002",
    dateTime: "2025-01-24 07:45 PM",
    orderType: OrderType.DELIVERY,
    customerName: "Alice Johnson",
    customerContact: "+44 7568 987654",
    dishes: [
      { name: "Butter Chicken", quantity: 1 },
      { name: "Garlic Naan", quantity: 3 },
    ],
    status: OrderStatus.DELIVERED,
    amount: 35.5,
    paymentStatus: "Pending",
    peakAt: "Dinner",
    popularFoodItem: "Butter Chicken",
    repeatCustomer: false,
    feedbackScore: 4.8,
    profitMargin: 40.5,
    assignedStaff: "Michael Brown",
    deliveryStatus: DeliveryStatus.DELIVERED,
    notes: "Spicy level: Medium",
    updatedOn: "2025-01-24 08:10 PM",
    createdBy: "Admin",
  },
  {
    id: "ORD003",
    dateTime: "2025-01-23 01:15 PM",
    orderType: OrderType.TAKEAWAY,
    customerName: "Michael Scott",
    customerContact: "+44 7123 654321",
    dishes: [
      { name: "Sushi Platter", quantity: 1 },
      { name: "Miso Soup", quantity: 2 },
    ],
    status: OrderStatus.REMOVED,
    amount: 28.75,
    paymentStatus: "Refunded",
    peakAt: "Lunch",
    popularFoodItem: "Sushi Platter",
    repeatCustomer: true,
    feedbackScore: 3.9,
    profitMargin: 25.8,
    assignedStaff: "Sarah Connor",
    deliveryStatus: DeliveryStatus.PENDING,
    notes: "Cancelled due to late pickup",
    updatedOn: "2025-01-23 01:45 PM",
    createdBy: "Admin",
  },
  {
    id: "ORD004",
    dateTime: "2025-01-22 06:00 PM",
    orderType: OrderType.DINE_IN,
    customerName: "David Smith",
    customerContact: "+44 7700 998877",
    dishes: [
      { name: "BBQ Ribs", quantity: 2 },
      { name: "Coleslaw", quantity: 1 },
    ],
    status: OrderStatus.PROCESSING,
    amount: 42.99,
    paymentStatus: "Paid",
    peakAt: "Dinner",
    popularFoodItem: "BBQ Ribs",
    repeatCustomer: false,
    feedbackScore: 4.2,
    profitMargin: 35.7,
    assignedStaff: "John Wick",
    deliveryStatus: DeliveryStatus.OUT_FOR_DELIVERY,
    notes: "Extra sauce on ribs",
    updatedOn: "2025-01-22 06:20 PM",
    createdBy: "Manager",
  },
  {
    id: "ORD005",
    dateTime: "2025-01-21 11:30 AM",
    orderType: OrderType.DELIVERY,
    customerName: "Sophia Wilson",
    customerContact: "+44 7765 443322",
    dishes: [
      { name: "Vegan Burger", quantity: 1 },
      { name: "Sweet Potato Fries", quantity: 1 },
    ],
    status: OrderStatus.DELIVERED,
    amount: 18.99,
    paymentStatus: "Paid",
    peakAt: "Brunch",
    popularFoodItem: "Vegan Burger",
    repeatCustomer: true,
    feedbackScore: 4.9,
    profitMargin: 50.2,
    assignedStaff: "Lara Croft",
    deliveryStatus: DeliveryStatus.DELIVERED,
    notes: "No onions",
    updatedOn: "2025-01-21 12:00 PM",
    createdBy: "Admin",
  },
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <OrderAnalysisTable data={orderAnalysisData} />
    </div>
  );
}
