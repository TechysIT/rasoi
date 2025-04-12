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
// import { productData } from "@/lib/data";
import MenuItem from "../components/Menu-card";
import { Separator } from "../components/ui/separator";
import OrderSummary from "../components/Order-summery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [productData, setProductData] = useState<any[]>([]);

  const storeId = "ef298430-00aa-4a11-96a0-d313378ce8f0";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await window.ipc.invoke("getCategories", storeId);
        // if (!result) {
        //   throw new Error("No data received from IPC");
        // }
        console.log("Fetched dishes from IPC:", result);
        setCategories(result);
      } catch (error) {
        console.error("Error fetching dishes from ipc:", error);
      }
    };
    const fetchDishes = async () => {
      try {
        const result = await window.ipc.invoke("getDishes", storeId);
        // if (!result) {
        //   throw new Error("No data received from IPC");
        // }
        console.log("Fetched dishes from IPC:", result);
        setProductData(result);
      } catch (error) {
        console.error("Error fetching dishes from ipc:", error);
      }
    };
    fetchDishes();
    fetchCategory();
  }, [storeId]);

  const handleAddToMenu = ({
    id,
    selectedAddons,
    quantity,
    note,
  }: {
    id: string;
    selectedAddons: string[];
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
      selectedAddons,
      quantity,
      note,
      addOns: product.addOns || [],
    };

    console.log("New product to add:", newProduct);
    setMenuItems((prev) => {
      if (!Array.isArray(prev)) {
        console.error("menuItems is not an array", prev);
        return [newProduct];
      }

      const existingIndex = prev.findIndex(
        (item) =>
          item.id === newProduct.id &&
          JSON.stringify(item.selectedAddons) ===
            JSON.stringify(newProduct.selectedAddons)
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
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="relative flex items-center py-2">
                  {/* Left Arrow (Only visible if scrollable) */}
                  {canScrollLeft && (
                    <button
                      onClick={scrollLeft}
                      className="absolute left-0 z-10 text-customPrimary-400 focus:outline-none"
                    >
                      <ChevronLeftIcon />
                    </button>
                  )}

                  {/* Tabs List */}
                  <div
                    ref={tabsListRef}
                    className="flex overflow-x-hidden whitespace-nowrap mx-8"
                  >
                    <TabsList className="flex gap-2 bg-transparent">
                      {/* "All" tab */}
                      <TabsTrigger
                        value="all"
                        className="rounded-2xl whitespace-nowrap data-[state=active]:bg-customPrimary-500 data-[state=active]:text-white capitalize"
                      >
                        All
                      </TabsTrigger>

                      {/* Category tabs */}
                      {categories.map((category) => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="rounded-2xl whitespace-nowrap data-[state=active]:bg-customPrimary-500 data-[state=active]:text-white capitalize"
                        >
                          {category.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {/* Right Arrow */}
                  {canScrollRight && (
                    <button
                      onClick={scrollRight}
                      className="absolute right-0 z-10 text-customPrimary-400 focus:outline-none"
                    >
                      <ChevronRightIcon />
                    </button>
                  )}
                </div>

                {/* Tabs Content for All Tab */}
                <TabsContent value="all">
                  <ScrollArea className="h-[90vh] pt-5 pb-16 mb-20 scrollbar-hide px-2 2xl:px-4">
                    <div className="grid grid-cols-4 2xl:grid-cols-5 gap-2 2xl:gap-6 pb-16">
                      {productData.map((product) => (
                        <ProductCard
                          key={product.id}
                          {...product}
                          onAddToMenu={handleAddToMenu}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Tabs Content for Each Category */}
                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <ScrollArea className="h-[90vh] pt-5 pb-16 mb-20 scrollbar-hide px-2 2xl:px-4">
                      <div className="grid grid-cols-4 2xl:grid-cols-5 gap-2 2xl:gap-6 pb-16">
                        {productData
                          .filter(
                            (product) => product.categoryId === category.id
                          )
                          .map((product) => (
                            <ProductCard
                              key={product.id}
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
              <Select defaultValue="dine-in">
                <SelectTrigger className="w-24 max-h-8 border-customPrimary-500 text-customPrimary-500 focus:ring-0 focus:border-customPrimary-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem
                    value="dine-in"
                    className="data-[state=checked]:bg-customPrimary-50 data-[highlighted]:bg-customPrimary-50 text-customPrimary-500"
                  >
                    Dine in
                  </SelectItem>
                  <SelectItem
                    value="takeaway"
                    className="data-[state=checked]:bg-customPrimary-50 data-[highlighted]:bg-customPrimary-50 text-customPrimary-500"
                  >
                    Takeaway
                  </SelectItem>
                  <SelectItem
                    value="delivery"
                    className="data-[state=checked]:bg-customPrimary-50 data-[highlighted]:bg-customPrimary-50 text-customPrimary-500"
                  >
                    Delivery
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="w-[92%] mx-auto" />
            <ScrollArea className="px-1 h-[90vh] pb-28  scrollbar-hide">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  title={item.name}
                  image={item.imageUrl}
                  price={item.price || 0}
                  quantity={item.quantity}
                  note={item.note}
                  onRemove={() => handleRemoveItem(item.id)}
                  addons={
                    Array.isArray(item.selectedAddons) &&
                    Array.isArray(item.addons)
                      ? (item.selectedAddons
                          .map((id: string) =>
                            item.addons.find((addon) => addon.id === id)
                          )
                          .filter(Boolean) as {
                          id: string;
                          name: string;
                          defaultSelected?: boolean;
                        }[])
                      : []
                  }
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
