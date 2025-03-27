import { useEffect } from "react";
import { ipcRenderer } from "electron";

export const useSync = () => {
  useEffect(() => {
    const syncData = () => {
      if (navigator.onLine) {
        ipcRenderer.invoke("sync-orders"); // Trigger sync in main process
      }
    };

    window.addEventListener("online", syncData);
    return () => window.removeEventListener("online", syncData);
  }, []);
};
