"use client";

import { useState } from "react";
import { Bell, AlertTriangle, Package, Flag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface Notification {
  id: string;
  type: "alert" | "order";
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      message:
        "Inventory running low! Flour stock is below the minimum threshold.",
      timestamp: "Jul 25, 2024 at 05:28 PM",
      read: false,
    },
    {
      id: "2",
      type: "order",
      message: "New order received! Order #12345 is now being processed.",
      timestamp: "Jul 25, 2024 at 05:28 PM",
      read: false,
    },
    {
      id: "3",
      type: "alert",
      message:
        "Refrigerator temperature is too high. Please check immediately!",
      timestamp: "Jul 25, 2024 at 05:28 PM",
      read: false,
    },
    {
      id: "4",
      type: "order",
      message: "Order #12346 has been successfully delivered.",
      timestamp: "Jul 25, 2024 at 05:28 PM",
      read: false,
    },
    {
      id: "2",
      type: "order",
      message: "New order received! Order #12345 is now being processed.",
      timestamp: "Jul 25, 2024 at 05:28 PM",
      read: false,
    },
    {
      id: "3",
      type: "alert",
      message:
        "Refrigerator temperature is too high. Please check immediately!",
      timestamp: "Jul 25, 2024 at 05:28 PM",
      read: false,
    },
    {
      id: "4",
      type: "order",
      message: "Order #12346 has been successfully delivered.",
      timestamp: "Jul 25, 2024 at 05:28 PM",
      read: false,
    },
  ]);

  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Dialog>
      <DialogTrigger className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </DialogTrigger>

      <DialogContent className="w-full max-w-lg rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-customPrimary-500">
            Notifications
          </h2>
        </div>

        <ScrollArea className="h-[400px]">
          <div>
            {notifications.map((notification) => (
              <div key={notification.id}>
                <div className="flex gap-3 p-4">
                  {notification.type === "alert" ? (
                    <div
                      className="flex items-center justify-center h-8 w-8 rounded-full 
                   bg-red-100"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center h-8 w-8 rounded-full 
  bg-blue-100"
                    >
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <p className="text-gray-900">{notification.message}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {notification.timestamp}
                      </p>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex items-center gap-1 text-xs"
                        disabled={notification.read}
                      >
                        <span
                          className={`${
                            notification.read
                              ? "text-gray-400 cursor-default"
                              : "text-customPrimary-500 cursor-pointer"
                          }`}
                        >
                          Mark as Read
                        </span>
                        <Flag
                          className={`h-3 w-3 ${
                            notification.read
                              ? "text-gray-400"
                              : "text-customPrimary-500"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <Separator className="w-[90%] bg-customPrimary-50 mx-auto" />
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
