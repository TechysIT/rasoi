// Global imports

import { DishesManagementTable } from "@/components/tables/Dishes-management";
import { ExpenseTable } from "@/components/tables/Expense-tracking";
import { ExpenseData, PaymentMethod } from "@/utils/Types";
import React from "react";

const expenseData: ExpenseData[] = [
  {
    id: "exp-001",
    date: "2025-02-06",
    category: "Office Supplies",
    amount: 120.5,
    paymentMethod: PaymentMethod.cash,
    supplier: "Staples UK",
  },
  {
    id: "exp-002",
    date: "2025-02-05",
    category: "Software Subscription",
    amount: 59.99,
    paymentMethod: PaymentMethod.card,
    supplier: "Adobe Inc.",
  },
  {
    id: "exp-003",
    date: "2025-02-04",
    category: "Electricity Bill",
    amount: 230.75,
    paymentMethod: PaymentMethod.bank,
    supplier: "UK Power Networks",
  },
  {
    id: "exp-004",
    date: "2025-02-03",
    category: "Internet Service",
    amount: 45.0,
    paymentMethod: PaymentMethod.bank,
    supplier: "BT Broadband",
  },
  {
    id: "exp-005",
    date: "2025-02-02",
    category: "Stationery",
    amount: 18.25,
    paymentMethod: PaymentMethod.cash,
    supplier: "Ryman UK",
  },
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <ExpenseTable data={expenseData} />
    </div>
  );
}
