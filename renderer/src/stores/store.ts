import { create } from "zustand";

// sidebar
interface sidebarSizeInterface {
  sidebarWidth: boolean;
  setSidebarWidth: (data: any) => void;
}

export const sidebarSizeState = create<sidebarSizeInterface>((set) => ({
  sidebarWidth: true,
  setSidebarWidth: (sidebarWidth: any) => set(() => ({ sidebarWidth })),
}));

// employeedata from cookie
interface RolePermissions {
  userManagement: boolean;
  orderManagement: boolean;
  inventoryManagement: boolean;
  reportManagement: boolean;
  menuManagement: boolean;
  settingManagement: boolean;
  roleManagement: boolean;
  kitchenManagement: boolean;
  cashManagement: boolean;
  customerManagement: boolean;
  supplierManagement: boolean;
}

interface Role {
  id: string;
  name: string;
  permissions: RolePermissions;
}

interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarPath: string;
  storeId: string;
  role: Role;
  createdAt: string;
  address: string;
  lastLoggedIn: string;
}

type EmployeeStore = {
  employee: EmployeeData | null;
  setEmployee: (employee: EmployeeData) => void;
  clearEmployee: () => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employee: null,
  setEmployee: (employee) => set({ employee }),
  clearEmployee: () => set({ employee: null }),
}));
