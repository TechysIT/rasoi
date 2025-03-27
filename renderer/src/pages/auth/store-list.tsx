"use client";
// Global Imports
import React, { useState } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";

interface StoreCardProps {
  id: number;
  name: string;
}

export default function StoreList({ id, name }: StoreCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <Button
      radius="none"
      onClick={handleSelect}
      className="w-full h-full p-0 m-0 "
    >
      <Card
        radius="none"
        className={` w-full h-full border-2 ${
          isSelected
            ? " border-orange-500 bg-customPrimary-50"
            : "  border-customPrimary-50"
        }`}
      >
        <CardBody className=" flex justify-center items-center relative bg-customPrimary-50">
          <Image
            alt="shop"
            className="object-cover"
            src="/icon/shop.png"
            width={50}
            height={50}
          />
          <div className=" bg-customPrimary-50 my-2 text-orange-500 flex justify-center items-center">
            {name}
          </div>
        </CardBody>
      </Card>
    </Button>
  );
}
