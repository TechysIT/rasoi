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
} from "./ui/dialog-cn";
import { useState, useEffect } from "react";
import { Textarea } from "@heroui/input";

interface ProductCardProps {
  id: string;
  name: string;
  rating: number;
  addons?: {
    id: string;
    name: string;
    defaultSelected?: boolean;
  }[];
  bowls: number;
  persons: number;
  price: number;
  itemDetails: string;
  imageUrl?: string;
  onAddToMenu: (product: any) => void;
}

export function ProductCard({
  id,
  name,
  rating,
  addons = [],
  bowls,
  persons,
  price,
  itemDetails,
  imageUrl,
  onAddToMenu,
}: ProductCardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setSelected([]);
      setNote("");
    } else {
      const defaultSelected = addons
        .filter((a) => a.defaultSelected)
        .map((a) => a.id);
      setSelected(defaultSelected);
    }
  }, [isOpen, addons]);

  const handleConfirm = () => {
    const selectedProduct = {
      id,
      selectedAddons: [...selected],
      quantity,
      note,
    };
    onAddToMenu(selectedProduct);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="flex flex-col overflow-hidden rounded-3xl shadow-md cursor-pointer hover:shadow-lg transition-shadow">
          <div className="relative p-2">
            <div className="relative aspect-[16/11]">
              <Image
                src={imageUrl || "placeholder.png"}
                alt={name}
                className="object-cover rounded-2xl"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <CardContent className="px-3 2xl:px-4 py-1.5 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium capitalize">{name}</h3>
                <div className="flex items-center">
                  <span className="text-customPrimary-500">★</span>
                  <span className="ml-1 text-sm text-gray-600">{rating}</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-600">
                Add-on:
                {addons.length > 0 ? (
                  addons.map((addon) => (
                    <span key={addon.id} className="ml-1 capitalize">
                      {addon.name}
                    </span>
                  ))
                ) : (
                  <span className="ml-1 italic text-gray-400">None</span>
                )}
              </p>

              <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
                <span>
                  <Users className="w-3 h-3" />
                </span>
                {persons} Persons
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end px-3 2xl:px-3 pb-3 bg-white">
              <div className="text-lg font-bold text-customPrimary-500">
                £{price.toFixed(2)}
              </div>
            </CardFooter>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-customSecondary-50 p-6 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-customPrimary-500 text-2xl tracking-wide mb-4 capitalize">
            {name}
          </DialogTitle>
          <DialogDescription className="text-zinc-600 grid grid-cols-3 gap-2">
            <p className="text-sm col-span-2 capitalize">{itemDetails}</p>
            <div className="items-center flex flex-col gap-2">
              <div className="relative aspect-square w-full">
                <Image
                  src={imageUrl || "placeholder.png"}
                  alt={name}
                  fill
                  className="object-cover border border-customPrimary-200 rounded-lg"
                />
              </div>
              <p className="text-customPrimary-500 font-semibold">
                £{price.toFixed(2)}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <h2 className="font-medium">Choose Your Add-ons</h2>
          <div className="grid grid-cols-3 gap-2 px-4">
            {addons.length > 0 ? (
              addons.map((addon) => (
                <Checkbox
                  key={addon.id}
                  value={addon.id}
                  isSelected={selected.includes(addon.id)}
                  onValueChange={(isSelected) => {
                    setSelected((prev) =>
                      isSelected
                        ? [...prev, addon.id]
                        : prev.filter((id) => id !== addon.id)
                    );
                  }}
                  radius="sm"
                  size="sm"
                  classNames={{
                    icon: "text-white",
                    wrapper:
                      "after:bg-customPrimary-500 before:border-customPrimary-300 capitalize",
                  }}
                >
                  {addon.name}
                </Checkbox>
              ))
            ) : (
              <p className="col-span-3 text-center text-sm text-gray-500">
                No add-ons for this dish
              </p>
            )}
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
          <div className="bg-customPrimary-50 flex justify-between items-center py-2 px-4 rounded-lg">
            <h2>Quantity</h2>
            <div className="grid grid-cols-3 gap-3 items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full bg-gray-300 hover:border-black"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus className="h-4 w-4 text-black" size={18} />
              </Button>
              <span className="text-xl  text-customPrimary-500 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full bg-black  text-white hover:text-black border border-black"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus size={18} className="h-4 w-4" />
              </Button>
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
  );
}
