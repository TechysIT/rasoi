// Global imports

import { DishesManagementTable } from "@/components/tables/Dishes-management";
import { DishesManagementData } from "@/utils/Types";
import React from "react";

const dishesData: DishesManagementData[] = [
  
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <DishesManagementTable data={dishesData} />
    </div>
  );
}
