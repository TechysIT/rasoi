"use client";

// Global Imports
import React from "react";
import { Bell, CheckCircle, Truck } from "lucide-react";
// Local Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShiftLog from "@/components/Shift-log";
import Image from "next/image";
import UploadProfile from "@/components/Upload-profile";
import { Avatar } from "@heroui/avatar";
import { Button, Input } from "@heroui/react";

const user = {
  name: "Esther Howard",
  email: "estherhoward@gmail.com",
  role: "Admin",
  franchise: "Coca Cola",
  photo: "/images/placeholder.jpg",
  phone: "765464544",
  username: "opurbo7",
  password: "",
};

const notifications: Array<{
  iconType: "order" | "update" | "delivery";
  message: string;
  date: string;
}> = [
  {
    iconType: "order",
    message:
      "New order placed for a table of 4: Spaghetti, Caesar Salad, and drinks.",
    date: "Feb 5, 2025 at 11:28 AM",
  },
  {
    iconType: "update",
    message: "Updated order for Table 3: Extra cheese added to the pizza.",
    date: "Feb 5, 2025 at 12:15 PM",
  },
  {
    iconType: "delivery",
    message: "Order #45 has been dispatched for delivery: Burger and Fries.",
    date: "Feb 5, 2025 at 01:30 PM",
  },
];

export default function Profile() {
  return (
    <div className="m-5 space-y-5 container mx-auto">
      <h2 className="text-2xl font-semibold text-customPrimary-500 text-center">
        Account Details
      </h2>
      <div className="flex flex-wrap justify-start items-center gap-5">
        <Avatar
          className="w-32 h-32"
          src={user.photo || "/images/placeholder.jpg"}
        />
        <div className="space-y-1">
          <h5 className="text-body font-semibold">{user.name}</h5>
          <p className="text-tag">{user.email}</p>
          <p className="text-tag">
            Franchise:
            <span className="ml-2">{user.franchise || "Not Assigned"}</span>
          </p>
          <p className="text-tag">
            Role:
            <span className="ml-2">{user.role || "Not Assigned"}</span>
          </p>
        </div>
      </div>
      <UploadProfile previousImage={user.photo || "/images/placeholder.jpg"} />

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3 bg-customPrimary-50">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:text-customPrimary-500"
          >
            Profile Information
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:text-customPrimary-500"
          >
            Activity Log
          </TabsTrigger>
          <TabsTrigger
            value="shift"
            className="data-[state=active]:text-customPrimary-500"
          >
            Shift Log
          </TabsTrigger>
        </TabsList>

        {/* Profile Information Tab */}
        <TabsContent value="profile">
          <div className="grid sm:grid-cols-2 gap-5 my-5">
            <InputField label="Full name" value={user.name} />
            <InputField label="Username" value={user.username} />
            <InputField label="Email" value={user.email} />
            <InputField label="Phone no" value={user.phone} />
            <PasswordInput label="Current Password" />
            <PasswordInput label="New Password" />
          </div>
          <div className="flex justify-end">
            <Button radius="sm" className="bg-customPrimary-500 text-white ">
              Update Profile
            </Button>
          </div>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="container">
          <ScrollArea className="h-80">
            {notifications.map((notification, index) => (
              <Notifications
                key={index}
                iconType={notification.iconType}
                message={notification.message}
                date={notification.date}
              />
            ))}
          </ScrollArea>
        </TabsContent>

        {/* Shift Log Tab */}
        <TabsContent value="shift">
          <ShiftLog />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Reusable Input Component for Profile Information
const InputField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="space-y-2">
    <h5 className="text-body font-semibold">{label}</h5>
    <Input
      type="text"
      classNames={{
        inputWrapper: "bg-white w-full h-12 rounded-lg",
        input: "group-data-[has-value=true]:text-itSecondary-500",
        errorMessage: "text-red-500",
      }}
      variant="bordered"
      value={value}
    />
  </div>
);

// Reusable Password Input Component
const PasswordInput: React.FC<{ label: string }> = ({ label }) => (
  <div className="space-y-2">
    <h5 className="text-body font-semibold">{label}</h5>
    <Input
      type="password"
      classNames={{
        inputWrapper: "bg-white w-full h-12 rounded-lg",
        input: "group-data-[has-value=true]:text-itSecondary-500",
        errorMessage: "text-red-500",
      }}
      variant="bordered"
    />
  </div>
);

type NotificationProps = {
  iconType: "order" | "update" | "delivery";
  message: string;
  date: string;
};

export const Notifications: React.FC<NotificationProps> = ({
  iconType,
  message,
  date,
}) => {
  const iconMap = {
    order: <Bell className="text-blue-500" size={24} />,
    update: <CheckCircle className="text-green-500" size={24} />,
    delivery: <Truck className="text-orange-500" size={24} />,
  };

  return (
    <div className="flex items-center gap-4 my-2 p-3 border rounded-lg shadow-sm bg-white">
      <div className="p-2 bg-gray-100 rounded-full">{iconMap[iconType]}</div>
      <div>
        <h5 className="font-medium text-gray-800">{message}</h5>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
    </div>
  );
};
