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
interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarPath: string;
  storeId: string;
  roleId: string;
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
