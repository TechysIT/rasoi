import Navbar from "@/components/Navbar";
import { NextProvider } from "@/components/Next-provider";
import Sidebar from "@/components/Sidebar";
import WindowNavbar from "@/components/WindowNavbar";
import "@/styles/globals.css";
import { motion } from "framer-motion";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useEmployeeStore } from "@/stores/store";

export default function App({ Component, pageProps }: AppProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [internetStatusShown, setInternetStatusShown] = useState(false);

  useEffect(() => {
    const fetchEmployeeFromCookie = async () => {
      try {
        const employee = await window.ipc.invoke("getEmployeeData");
        if (employee?.success && employee.data) {
          // console.log("Fetched Employee:", employee.data);
          useEmployeeStore.getState().setEmployee(employee.data);
        }
      } catch (error) {
        console.error("Failed to fetch employee from cookie:", error);
      }
    };

    fetchEmployeeFromCookie();

    // // Check if there's an internet connection initially
    if (!navigator.onLine) {
      setIsOnline(false);
      setInternetStatusShown(true);
    }

    // Handler for online event
    const handleOnline = () => {
      setIsOnline(true);
      setTimeout(() => setInternetStatusShown(false), 2000);
    };

    // Handler for offline event
    const handleOffline = () => {
      setIsOnline(false);
      setInternetStatusShown(true);
    };

    // Adding event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <NextProvider>
      <Toaster />
      <div className="flex flex-col h-screen">
        <WindowNavbar />
        {internetStatusShown && (
          <motion.div
            className="w-full bg-bgCard font-medium text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isOnline ? "Back online" : "No internet connection"}
          </motion.div>
        )}
        <div className="select-none justify-stretch flex w-full max-h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex h-full w-full flex-col overflow-hidden">
            <Navbar />
            <main className="relative h-full w-full overflow-hidden">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </div>
    </NextProvider>
  );
}
