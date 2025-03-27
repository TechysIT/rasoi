import { create } from "zustand";

interface sidebarSizeInterface {
  sidebarWidth: boolean;
  setSidebarWidth: (data: any) => void;
}

export const sidebarSizeState = create<sidebarSizeInterface>((set) => ({
  sidebarWidth: true,
  setSidebarWidth: (sidebarWidth: any) => set(() => ({ sidebarWidth })),
}));
