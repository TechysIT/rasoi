"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRef, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ProductCard } from "../components/Product-card";
import { ScrollArea } from "../components/ui/scroll-area";
import { categories, productData } from "@/lib/data";
import MenuItem from "../components/Menu-card";
import { Select, SelectItem } from "@heroui/select";
import { Separator } from "../components/ui/separator";
import OrderSummary from "../components/Order-summery";

export default function Home() {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const handleAddToMenu = ({
    id,
    selectedFillings,
    quantity,
    note,
  }: {
    id: string;
    selectedFillings: string[];
    quantity: number;
    note: string;
  }) => {
    const product = productData.find((item) => item.id === id);
    if (!product) {
      console.error(`Product with ID ${id} not found in productData`);
      return;
    }

    const newProduct = {
      ...product,
      selectedFillings,
      quantity,
      note,
    };

    setMenuItems((prev) => {
      if (!Array.isArray(prev)) {
        console.error("menuItems is not an array", prev);
        return [newProduct];
      }

      const existingIndex = prev.findIndex(
        (item) =>
          item.id === newProduct.id &&
          JSON.stringify(item.selectedFillings) ===
            JSON.stringify(newProduct.selectedFillings)
      );

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + newProduct.quantity }
            : item
        );
      } else {
        return [...prev, newProduct];
      }
    });
  };

  useEffect(() => {
    const updateScrollability = () => {
      if (tabsListRef.current) {
        const isScrollableLeft = tabsListRef.current.scrollLeft > 0;
        const isScrollableRight =
          tabsListRef.current.scrollWidth > tabsListRef.current.clientWidth &&
          tabsListRef.current.scrollLeft <
            tabsListRef.current.scrollWidth - tabsListRef.current.clientWidth;

        setCanScrollLeft(isScrollableLeft);
        setCanScrollRight(isScrollableRight);
      }
    };

    // Check on load and on window resize
    updateScrollability();
    window.addEventListener("resize", updateScrollability);

    if (tabsListRef.current) {
      tabsListRef.current.addEventListener("scroll", updateScrollability);
    }

    return () => {
      window.removeEventListener("resize", updateScrollability);
      if (tabsListRef.current) {
        tabsListRef.current.removeEventListener("scroll", updateScrollability);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handleRemoveItem = (id: number) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="border"
      style={{ height: "100vh", width: "100%" }}
    >
      <ResizablePanel defaultSize={70} maxSize={85} minSize={40}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={80}>
            <div className="w-full ">
              {/* Tabs with Conditional Arrow Navigation */}
              <Tabs defaultValue="all" className="w-full ">
                <div className="relative flex items-center py-2">
                  {/* Left Arrow (Only visible if scrollable) */}
                  {canScrollLeft && (
                    <button
                      onClick={scrollLeft}
                      className="absolute left-0 z-10  text-customPrimary-400   focus:outline-none"
                    >
                      <ChevronLeftIcon />
                    </button>
                  )}

                  {/* Tabs List (Hiding the scrollbar) */}
                  <div
                    ref={tabsListRef}
                    className="flex overflow-x-hidden whitespace-nowrap mx-8"
                  >
                    <TabsList className="flex gap-2 bg-transparent">
                      {categories.map((category) => (
                        <TabsTrigger
                          key={category.value}
                          value={category.value}
                          className="rounded-2xl whitespace-nowrap data-[state=active]:bg-customPrimary-500 data-[state=active]:text-white"
                        >
                          {category.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {/* Right Arrow (Only visible if scrollable) */}
                  {canScrollRight && (
                    <button
                      onClick={scrollRight}
                      className="absolute right-0 z-10  text-customPrimary-400
             focus:outline-none"
                    >
                      <ChevronRightIcon />
                    </button>
                  )}
                </div>

                {/* Tabs Content */}
                {categories.map((category) => (
                  <TabsContent key={category.value} value={category.value}>
                    <h3 className="text-lg font-semibold container">
                      {category.label} Dishes
                    </h3>

                    <ScrollArea className="h-[90vh] pt-5 pb-16 mb-20 scrollbar-hide  px-2 2xl:px-4">
                      <div className="grid grid-cols-4 2xl:grid-cols-5 gap-2 2xl:gap-6 pb-16 ">
                        {productData.map((product) => (
                          <ProductCard
                            key={product.title}
                            {...product}
                            onAddToMenu={handleAddToMenu}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30} maxSize={40} minSize={25}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="flex items-center justify-between  p-4 mx-auto bg-customSecondary-50 ">
              <div>
                <h2 className="text-customPrimary-500 font-semibold ">
                  Customer Order
                </h2>
                <p className="text-gray-500 text-sm">
                  Order no: <span>ABC123abc</span>
                </p>
              </div>
              <Select
                defaultSelectedKeys={["dine-in"]}
                radius="sm"
                classNames={{
                  base: "w-28 text-customPrimary-500",
                  trigger:
                    "group-data-[has-value=true]:border-customPrimary-500 border-customPrimary-500",
                  value: "group-data-[has-value=true]:text-customPrimary-500",
                  listbox:
                    "data-[hover=true]:bg-customPrimary-50 data-[selectable=true]:bg-customPrimary-50",
                }}
                variant="bordered"
              >
                <SelectItem key="dine-in" value="Dine in">
                  Dine in
                </SelectItem>
                <SelectItem key="takeaway" value="Takeaway">
                  Takeaway
                </SelectItem>
                <SelectItem key="delivery" value="Delivery">
                  Delivery
                </SelectItem>
              </Select>
            </div>
            <Separator className="w-[92%] mx-auto" />
            <ScrollArea className="px-1 h-[90vh] pb-28  scrollbar-hide">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  title={item.title}
                  image={item.imageUrl}
                  price={item.price || 0}
                  quantity={item.quantity}
                  note={item.note}
                  onRemove={() => handleRemoveItem(item.id)}
                  addOns={item.selectedFillings
                    .map((index: number) => productData[0].addOns[index])
                    .join(", ")}
                  onQuantityChange={(quantity) => {
                    setMenuItems((prev) =>
                      prev.map((prevItem, prevIndex) =>
                        prevIndex === index
                          ? { ...prevItem, quantity }
                          : prevItem
                      )
                    );
                  }}
                />
              ))}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={52} maxSize={70} minSize={25}>
            <OrderSummary setMenuItems={setMenuItems} menuItems={menuItems} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
