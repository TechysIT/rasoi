import Image from "next/image";
import { CircleX, Minus, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MenuItemProps {
  title: string;
  image: string;
  addOns?: string;
  note?: string;
  price: number;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

export default function MenuItem({
  title,
  image,
  addOns,
  note,
  price,
  quantity = 1,
  onQuantityChange,
  onRemove,
}: MenuItemProps) {
  console.log("MenuItemProps", addOns);
  return (
    <Card className="w-full my-1 shadow-md rounded-2xl">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium text-sm 2xl:text-base">{title}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-fit w-fit text-customPrimary-500"
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-fit w-fit text-red-600"
                    onClick={onRemove}
                  >
                    <CircleX />
                  </Button>
                </div>
              </div>

              {addOns && (
                <p className="text-xs 2xl:text-sm text-muted-foreground">
                  Add on: {addOns}
                </p>
              )}
              {note && (
                <p className="text-xs 2xl:text-sm text-muted-foreground">
                  Note: {note}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium text-customPrimary-500 ">
                £{price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-gray-300 hover:border-black"
                  onClick={() => onQuantityChange?.(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4 text-black" />
                </Button>
                <span className="w-4 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-black  text-white hover:text-black border border-black"
                  onClick={() => onQuantityChange?.(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
