// Global imports

import { UserRolesTable } from "@/components/tables/User-roles";
import { UserRoles } from "@/utils/Types";

import React from "react";

export const userRoles: UserRoles[] = [
  {
    id: "role_001",
    name: "Super Admin",
    permissions: [
      "create_user",
      "edit_user",
      "delete_user",
      "view_reports",
      "manage_settings",
      "approve_requests",
    ],
    createdby: "system@example.com",
  },
  {
    id: "role_002",
    name: "Manager",
    permissions: [
      "create_user",
      "edit_user",
      "view_reports",
      "approve_requests",
    ],
    createdby: "admin@example.com",
  },
  {
    id: "role_003",
    name: "Team Lead",
    permissions: ["create_user", "edit_user", "view_reports"],
    createdby: "manager@example.com",
  },
  {
    id: "role_004",
    name: "Analyst",
    permissions: ["view_reports", "manage_settings"],
    createdby: "admin@example.com",
  },
  {
    id: "role_005",
    name: "Basic User",
    permissions: ["view_reports"],
    createdby: "manager@example.com",
  },
  {
    id: "role_006",
    name: "Support Staff",
    permissions: ["create_user", "approve_requests"],
    createdby: "team.lead@example.com",
  },
  {
    id: "role_007",
    name: "Read Only",
    permissions: ["view_reports"],
    createdby: "admin@example.com",
  },
];

export default function ManageSuppliers() {
  return (
    <div className="container overflow-auto pb-20">
      <UserRolesTable data={userRoles} />
    </div>
  );
}
