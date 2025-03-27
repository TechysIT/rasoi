"use client";

import { Heart, Minus, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@heroui/checkbox";
import Image from "next/image";
import { Button as HeroButton } from "@heroui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState, useEffect } from "react";
import { Textarea } from "@heroui/input";

interface ProductCardProps {
  id: string;
  title: string;
  rating: number;
  addOns: string[];
  bowls: number;
  persons: number;
  price: number;
  itemDetails: string;
  imageUrl?: string;
  fetchFillings: () => Promise<
    { id: string; name: string; defaultSelected?: boolean }[]
  >;
  onAddToMenu: (product: any) => void;
}

export function ProductCard({
  id,
  title,
  rating,
  addOns,
  bowls,
  persons,
  price,
  itemDetails,
  imageUrl = "/placeholder.svg?height=200&width=200",
  onAddToMenu,
  fetchFillings,
}: ProductCardProps) {
  const [fillings, setFillings] = useState<
    { id: string; name: string; defaultSelected?: boolean }[]
  >([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    async function loadFillings() {
      const data = await fetchFillings();
      setFillings(data);
      setSelected(data.filter((f) => f.defaultSelected).map((f) => f.id));
    }

    if (!isOpen) {
      setQuantity(1);
      setSelected([]);
      setNote("");
    } else {
      loadFillings();
    }
  }, [isOpen, fetchFillings]);

  const handleConfirm = () => {
    const selectedProduct = {
      id,
      selectedFillings: [...selected],
      quantity,
      note,
    };
    onAddToMenu(selectedProduct);

    setIsOpen(false);
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-3xl shadow-md">
      <div className="relative p-2">
        <div className="relative aspect-[16/11]">
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover rounded-2xl"
            fill
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 h-6 w-6 rounded-full bg-white/80 hover:bg-white/90"
        >
          <Heart className="h-4 w-4 text-customPrimary-500" />
        </Button>
      </div>
      <div className="flex flex-col flex-1">
        <CardContent className="px-3 2xl:px-4 py-1.5 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{title}</h3>
            <div className="flex items-center">
              <span className="text-customPrimary-500">★</span>
              <span className="ml-1 text-sm text-gray-600">{rating}</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            Add-on: {addOns.join(", ")}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span>◎</span> {bowls} Bowls
            </div>
            <div className="flex items-center gap-1">
              <span>
                <Users className="w-3 h-3" />
              </span>
              {persons} Persons
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between px-3 2xl:px-3 pb-3 bg-white">
          <div className="text-lg font-bold text-customPrimary-500">
            £{price.toFixed(2)}
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="bg-customPrimary-500 hover:bg-customPrimary-700 text-white p-2 hover:shadow-lg rounded-tl-2xl  rounded-br-2xl text-xs font-normal">
              Add to Cart
            </DialogTrigger>
            <DialogContent className="w-full max-w-md bg-customSecondary-50 p-6 dark:bg-zinc-900">
              <DialogHeader>
                <DialogTitle className="text-customPrimary-500 text-2xl tracking-wide mb-4">
                  {title}
                </DialogTitle>
                <DialogDescription className="text-zinc-600 grid grid-cols-3  gap-2">
                  <p className="text-sm col-span-2">{itemDetails}</p>
                  <div className="items-center flex flex-col gap-2">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover border border-customPrimary-200 rounded-lg"
                      />
                    </div>
                    <p className="text-customPrimary-500 font-semibold">
                      £99.30
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col space-y-4">
                <h2 className="font-medium">Choose Your Filling</h2>
                <div className="grid grid-cols-3 gap-2 px-4">
                  {fillings.map((filling) => (
                    <Checkbox
                      key={filling.id}
                      value={filling.id}
                      isSelected={selected.includes(filling.id)}
                      onValueChange={(isSelected) => {
                        setSelected((prev) =>
                          isSelected
                            ? [...prev, filling.id]
                            : prev.filter((id) => id !== filling.id)
                        );
                      }}
                      radius="sm"
                      size="sm"
                      classNames={{
                        icon: "text-white",
                        wrapper:
                          "after:bg-customPrimary-500 before:border-customPrimary-300",
                      }}
                    >
                      {filling.name}
                    </Checkbox>
                  ))}
                </div>
                <Textarea
                  isClearable
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  size="sm"
                  placeholder="Note"
                  variant="bordered"
                  classNames={{
                    base: "w-full ",
                    inputWrapper:
                      "group-data-[focus=true]:border-customPrimary-200 shadow-none",
                    clearButton: "text-customPrimary-500",
                  }}
                />
                <div className=" bg-customPrimary-50 flex justify-between items-center py-2 px-4 rounded-lg ">
                  <h2>Quantity</h2>
                  <div className="grid grid-cols-3 gap-1 items-center justify-center">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-xl text-customPrimary-500 text-center">
                      {quantity}
                    </span>
                    <button onClick={() => setQuantity((prev) => prev + 1)}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                <HeroButton
                  radius="sm"
                  className="inline-flex items-center justify-center self-end bg-customPrimary-500 text-customSecondary-500 tracking-wider font-medium"
                  type="submit"
                  onPress={handleConfirm}
                >
                  Confirm
                </HeroButton>
              </div>
              <DialogClose />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </div>
    </Card>
  );
}
