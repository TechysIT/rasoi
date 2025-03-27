// Global imports

import { OrderGRNTable } from "@/components/tables/Inventory-grn";
import { InventoryGRNData } from "@/utils/Types";
import React from "react";

const inventoryGRN: InventoryGRNData[] = [
  {
    id: "GRN-001",
    name: "Tomatoes",
    supplier: "Fresh Farm Ltd.",
    recivedDate: "2025-01-20",
    recivedby: "Alice Johnson",
    qty: 500,
    category: "Vegetables",
    amount: 250,
    items: 5,
  },
  {
    id: "GRN-002",
    name: "Chicken Breast",
    supplier: "Organic Meats Co.",
    recivedDate: "2025-01-18",
    recivedby: "Mark Spencer",
    qty: 200,
    category: "Meat",
    amount: 600,
    items: 10,
  },
  {
    id: "GRN-003",
    name: "Olive Oil",
    supplier: "Mediterranean Goods",
    recivedDate: "2025-01-22",
    recivedby: "Sophia Carter",
    qty: 100,
    category: "Condiments",
    amount: 400,
    items: 2,
  },
  {
    id: "GRN-004",
    name: "Cheddar Cheese",
    supplier: "Dairy Delights",
    recivedDate: "2025-01-21",
    recivedby: "Daniel Lee",
    qty: 150,
    category: "Dairy",
    amount: 300,
    items: 3,
  },
  {
    id: "GRN-005",
    name: "Rice Basmati",
    supplier: "Grain Suppliers Ltd.",
    recivedDate: "2025-01-23",
    recivedby: "Emma Watson",
    qty: 1000,
    category: "Grains",
    amount: 900,
    items: 20,
  },
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <OrderGRNTable data={inventoryGRN} />
    </div>
  );
}
