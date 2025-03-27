// Global imports
import { DishesAddonsTable } from "@/components/tables/Dishes-addOns";
import { AddOnsTypes } from "@/utils/Types";
import React from "react";

const addOnsData: AddOnsTypes[] = [
  {
    id: "ADDON-001",
    name: "Extra Cheese",
    variations: "Mozzarella, Cheddar, Parmesan",
    itemUsed: "Cheese, Dairy",
    mandatory: false,
    price: 2.5,
    createdBy: "John Doe",
  },
  {
    id: "ADDON-002",
    name: "Spicy Sauce",
    variations: "Mild, Medium, Extra Hot",
    itemUsed: "Chili Peppers, Vinegar, Garlic",
    mandatory: false,
    price: 1.5,
    createdBy: "Alice Johnson",
  },
  {
    id: "ADDON-003",
    name: "Gluten-Free Bun",
    variations: "Standard, Sesame",
    itemUsed: "Rice Flour, Xanthan Gum",
    mandatory: true,
    price: 3.0,
    createdBy: "Mark Spencer",
  },
  {
    id: "ADDON-004",
    name: "Avocado Slices",
    variations: "Standard, Mashed",
    itemUsed: "Avocado, Lime, Salt",
    mandatory: false,
    price: 2.0,
    createdBy: "Emily Carter",
  },
  {
    id: "ADDON-005",
    name: "Grilled Mushrooms",
    variations: "Button, Portobello",
    itemUsed: "Mushrooms, Butter, Garlic",
    mandatory: false,
    price: 2.2,
    createdBy: "Michael Lee",
  },
  {
    id: "ADDON-006",
    name: "Organic Honey",
    variations: "Raw, Processed",
    itemUsed: "Honey",
    mandatory: false,
    price: 1.8,
    createdBy: "Sophia Green",
  },
  {
    id: "ADDON-007",
    name: "Caramel Drizzle",
    variations: "Salted, Classic",
    itemUsed: "Sugar, Butter, Cream",
    mandatory: false,
    price: 1.2,
    createdBy: "Daniel Brown",
  },
  {
    id: "ADDON-008",
    name: "Nut Toppings",
    variations: "Almonds, Walnuts, Cashews",
    itemUsed: "Assorted Nuts",
    mandatory: false,
    price: 2.3,
    createdBy: "Emma White",
  },
  {
    id: "ADDON-009",
    name: "Herbal Seasoning",
    variations: "Basil, Oregano, Thyme",
    itemUsed: "Dried Herbs, Spices",
    mandatory: false,
    price: 1.0,
    createdBy: "Robert Smith",
  },
  {
    id: "ADDON-010",
    name: "Vegan Cheese",
    variations: "Cheddar, Mozzarella",
    itemUsed: "Plant-Based Milk, Nutritional Yeast",
    mandatory: true,
    price: 2.7,
    createdBy: "Laura Wilson",
  },
];

export default function ManageAddOns() {
  return (
    <div className="container overflow-auto pb-20">
      <DishesAddonsTable data={addOnsData} />
    </div>
  );
}
