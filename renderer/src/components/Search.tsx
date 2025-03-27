"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { productData } from "@/lib/data";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function SearchProduct() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter  based on search query
  const filteredProducts = productData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemDetails.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Search Input */}
      <div className="relative flex items-center gap-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for menus or orders"
          className="w-full pl-10 pr-4 h-10 rounded-md focus:ring-0"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
        />
      </div>
 
      {isOpen && (
        <div className="absolute  w-full bg-white border border-gray-300 rounded-md shadow-md mt-5 z-50">
          <ScrollArea className="max-h-[400px]">
            <div className="p-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <>
                    {" "}
                    <Card
                      key={item.id}
                      className="mb-4 p-4 shadow-none border-none"
                    >
                      <div className="flex gap-4">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-24 h-24 rounded-lg object-cover"
                          width={100}
                          height={100}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {item.itemDetails}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold">£{item.price}</span>
                            <span className="text-orange-500 text-sm">
                              {item.rating} left in stock
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <Separator className="w-[95%] mx-auto bg-customPrimary-100" />
                  </>
                ))
              ) : (
                <p className="text-center text-gray-500 h-52 flex justify-center items-center">
                  No results found
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
