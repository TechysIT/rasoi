"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  FileText,
  Package,
  Utensils,
  Settings,
  User,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Lottie from "lottie-react";
import arrow from "@/lib/arrow.json";

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");

  const navigation = [
    { name: "Home", href: "/", icon: Home },

    {
      name: "Order",
      href: "/order",
      icon: FileText,
      submenu: [
        { name: "Order Requests", href: "/order/requests" },
        { name: "Order Management", href: "/order/management" },
        { name: "Order Analysis", href: "/order/analysis" },
      ],
    },

    {
      name: "Inventory",
      href: "/inventory",
      icon: Package,
      submenu: [
        { name: "Stock", href: "/inventory/stock" },
        { name: "Categories", href: "/inventory/categories" },
        { name: "GRN", href: "/inventory/grn" },
      ],
    },

    {
      name: "Dishes",
      href: "/dishes",
      icon: Utensils,
      submenu: [
        { name: "Manage Dishes", href: "/dishes/manage" },
        { name: "Dishes Add-ons", href: "/dishes/add-ons" },
      ],
    },

    {
      name: "User",
      href: "/User",
      icon: User,
      submenu: [
        { name: "Mangane Users", href: "/user/users-list" },
        { name: "Mangane Roles", href: "/user/roles" },
        { name: "Customers", href: "/user/customer-list" },
      ],
    },
    {
      name: "Manage",
      href: "/manage",
      icon: SlidersHorizontal,
      submenu: [
        { name: "Sales Report", href: "/manage/sales-report" },
        { name: "Expense Tracking", href: "/manage/expense" },
        { name: "Table Management", href: "/manage/table" },
      ],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      submenu: [
        { name: "Store Settings", href: "/settings/store" },
        { name: "Device Settings", href: "/settings/device" },
      ],
    },
    {
      name: "Auth",
      href: "/auth",
      icon: ChevronRight,
      submenu: [{ name: "Store Settings", href: "/auth/store" }],
    },
  ];

  // const customColor = "hsl(var(--customprimary-500))";

  return (
    <div
      className={`flex h-screen flex-col border-r bg-white py-4 transition-all duration-300 ${
        isExpanded ? "w-56" : "w-20"
      }`}
    >
      <div className="mb-8 flex items-center px-4">
        <Link href="/" className="flex justify-center items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 shadow-xl  border-customPrimary-500 p-1.5">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={40}
              height={40}
              className="object-center overflow-hidden"
            />
          </div>
          <h2
            className={`text-xl font-bold text-customPrimary-500 truncate ${
              isExpanded ? "block" : "hidden"
            }`}
          >
            {(() => {
              const words = "Techy's limit expenses house".split(" ");
              return words.length > 0 ? words[0].slice(0, 7) : "";
            })()}
          </h2>
        </Link>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto rounded-lg p-2 z-10 relative"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Lottie
            animationData={arrow}
            loop={true}
            className={`w-5 h-5 transition-transform  ${
              isExpanded ? "rotate-90" : "-rotate-90"
            }`}
          />
        </button>
      </div>

      <nav className="flex flex-1 flex-col space-y-6 px-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const isSubmenuActive = item.submenu?.some((sub) =>
            pathname.startsWith(sub.href)
          );
          const Icon = item.icon;

          return (
            <div key={item.name}>
              {item.submenu ? (
                isExpanded ? (
                  <Accordion
                    type="single"
                    collapsible
                    value={openAccordion === item.name ? item.name : ""}
                    onValueChange={(value) =>
                      setOpenAccordion(value === openAccordion ? "" : value)
                    }
                  >
                    <AccordionItem value={item.name} className="border-none">
                      <AccordionTrigger
                        className={`flex items-center px-2 py-2 rounded-lg cursor-pointer transition-colors w-full hover:no-underline ${
                          isSubmenuActive
                            ? "bg-customPrimary-500 text-white"
                            : "text-gray-500 hover:bg-customPrimary-50 hover:text-customPrimary-500 "
                        }`}
                      >
                        <div className="flex items-center w-full">
                          <Icon className="h-5 w-5" />
                          <span className="ml-3 text-start text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-6 space-y-1 mt-3 ">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={`block px-2 py-1  rounded-md text-sm transition ${
                                pathname === sub.href
                                  ? "bg-customPrimary-50 text-customPrimary-500"
                                  : "text-gray-600 hover:bg-customPrimary-50 hover:text-customPrimary-500"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div
                        className={`group flex h-10 w-full items-center justify-center rounded-lg transition-colors ${
                          isSubmenuActive
                            ? "bg-customPrimary-500 text-white"
                            : "text-gray-500 hover:bg-customPrimary-50"
                        } cursor-pointer`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="right"
                      align="start"
                      className="ml-3 shadow-md  border-customPrimary-100"
                    >
                      {item.submenu.map((sub) => (
                        <DropdownMenuItem key={sub.name} asChild>
                          <Link
                            href={sub.href}
                            className={`w-full px-2 py-1 mb-1.5 rounded-md text-sm transition ${
                              pathname === sub.href
                                ? "bg-customPrimary-50 text-customPrimary-500"
                                : "text-gray-600   hover:bg-customPrimary-50 hover:text-customPrimary-500"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              ) : (
                <Link
                  href={item.href}
                  className={`group flex h-10 items-center ${
                    isExpanded ? "justify-start" : "justify-center"
                  } rounded-lg px-2 transition-colors ${
                    isActive
                      ? "bg-customPrimary-500 text-white"
                      : "text-gray-500 hover:bg-customPrimary-50"
                  }`}
                  aria-label={item.name}
                >
                  <Icon className="h-5 w-5" />
                  {isExpanded && (
                    <span
                      className={`ml-3 text-sm font-medium transition-opacity ${
                        isActive ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
