// Global imports

import { UserTable } from "@/components/tables/User-list";
import { UserList } from "@/utils/Types";

import React from "react";

export const userList: UserList[] = [
  {
    id: "1",
    franchise: "London",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    role: "Admin",

    lastLogin: "2025-01-30 10:00 AM",
    createdOn: "2024-06-15",
  },
  {
    id: "2",
    franchise: "Manchester",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    role: "Manager",

    lastLogin: "2025-01-28 02:30 PM",
    createdOn: "2024-07-20",
  },
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <UserTable data={userList} />
    </div>
  );
}
