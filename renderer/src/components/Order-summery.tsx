"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState, useEffect, ReactNode } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Button as NextButton } from "@heroui/button";
import { cn } from "@/utils/cn";
import { Textarea } from "@heroui/input";
import { customTransition, customVariants } from "@/lib/constant";
import { Label } from "./ui/label";
import { MultiSelectButtonGroup } from "./Table-list-select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "./ui/separator";

interface OrderSummaryProps {
  menuItems: any[];
  setMenuItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const presetDiscounts = [
  { label: "£5 off", value: "fixed-5", amount: 5 },
  { label: "£15 off", value: "fixed-15", amount: 15 },
  { label: "10% off", value: "percent-10", percentage: 10 },
  { label: "20% off", value: "percent-20", percentage: 20 },
];

export default function OrderSummary({
  menuItems,
  setMenuItems,
}: OrderSummaryProps) {
  const [percentage, setPercentage] = useState(0);
  const [activeDiscount, setActiveDiscount] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState("");

  // Calculate subtotal, tax, tip, and total
  const calculateSubtotal = () => {
    return menuItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal: number) => subtotal * 0.02;

  const calculateTip = () => {
    return tipAmount ? parseFloat(tipAmount) || 0 : 0;
  };

  const calculateTotal = (
    subtotal: number,
    tax: number,
    tip: number,
    discount: number
  ) => {
    return subtotal - discount + tax + tip;
  };

  // Calculate discount
  const calculateDiscount = () => {
    if (!activeDiscount) return 0;

    const discount = presetDiscounts.find((d) => d.value === activeDiscount);
    if (!discount) return 0;

    return discount.percentage
      ? (calculateSubtotal() * discount.percentage) / 100
      : discount.amount || 0;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const tip = calculateTip();
  const discount = discountApplied || calculateDiscount();
  const total = calculateTotal(subtotal, tax, tip, discount);

  // Handlers
  const handleDiscountClick = (discount: (typeof presetDiscounts)[0]) => {
    if (appliedPromo) return;
    setActiveDiscount(discount.value);
  };

  const handleSliderChange = (value: number[]) => {
    if (appliedPromo) return;
    setPercentage(value[0]);
    setActiveDiscount(`percent-${value[0]}`);
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) return;
    setAppliedPromo(promoCode);
    setActiveDiscount(null);
  };

  const clearPromoCode = () => {
    setPromoCode("");
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const handleReset = () => {
    setMenuItems([]);
    setActiveDiscount(null);
    setDiscountApplied(0);
    setPromoCode("");
    setAppliedPromo(null);
    setPercentage(0);
    setTipAmount("");
  };

  const handlePrint = () => {
    console.log("Printing order slip...");
  };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {/* Note Dialog */}
          <CustomDialog
            title="Add Note"
            triggerText="Note"
            dialogName="note"
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
          >
            <Textarea radius="sm" placeholder="Write note" />
          </CustomDialog>

          {/* Tips Dialog */}
          <CustomDialog
            title="Write the tip amount"
            triggerText="Tips"
            dialogName="tips"
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
          >
            <Input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              placeholder="Enter the tip amount"
            />
          </CustomDialog>
        </div>

        {/* Discount Dialog */}
        <CustomDialog
          title="Add Discount"
          triggerText="Add Discount"
          dialogName="discount"
          activeDialog={activeDialog}
          setActiveDialog={setActiveDialog}
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Discount Percentage</p>
            <div className="flex items-center gap-4">
              <Slider
                value={[percentage]}
                onValueChange={handleSliderChange}
                max={100}
                step={1}
                disabled={!!appliedPromo}
                className={cn(
                  "w-full",
                  "[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-white",
                  "[&_[role=slider]]:border-2 [&_[role=slider]]:border-customPrimary-500 [&_[role=slider]]:shadow-md",
                  "[&_[role=slider]]:focus-visible:ring-2 [&_[role=slider]]:focus-visible:ring-customPrimary-500",
                  "[&_[data-orientation=horizontal]]:h-2 [&_[data-orientation=horizontal]]:bg-customPrimary-100",
                  "[&_[data-orientation=horizontal]_.absolute]:bg-customPrimary-500"
                )}
              />
              <span className="w-12 text-sm">{percentage}%</span>
            </div>
          </div>

          {/* Preset Discount Buttons */}
          <div className="flex flex-wrap gap-2">
            {presetDiscounts.map((discount) => (
              <Button
                key={discount.value}
                variant={
                  activeDiscount === discount.value ? "default" : "outline"
                }
                className={
                  activeDiscount === discount.value
                    ? "bg-customPrimary-500 text-white hover:bg-customPrimary-600"
                    : "border-customPrimary-500 text-customPrimary-500 hover:bg-customPrimary-50"
                }
                onClick={() => handleDiscountClick(discount)}
                disabled={!!appliedPromo}
              >
                {discount.label}
              </Button>
            ))}
          </div>

          {/* Promo Code Input */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={!!appliedPromo}
            />
            <NextButton
              radius="sm"
              onPress={appliedPromo ? clearPromoCode : applyPromoCode}
              className="bg-customPrimary-500 hover:bg-customPrimary-600 text-white"
            >
              {appliedPromo ? "Remove" : "Apply"}
            </NextButton>
          </div>
        </CustomDialog>
      </div>

      <div className="space-y-1 2xl:space-y-3 mb-4">
        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-muted-foreground">Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm 2xl:text-base">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-red-500">- £{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-muted-foreground">VAT (2%)</span>
          <span>£{tax.toFixed(2)}</span>
        </div>
        {tip > 0 && (
          <div className="flex justify-between text-sm 2xl:text-base">
            <span className="text-muted-foreground">Tip</span>
            <span className="text-green-500">+ £{tip.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between pt-1 2xl:pt-3 border-t 2xl:text-lg font-medium">
          <span>Total:</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-3 mb-3">
        <CheckoutDialog
          menuItems={menuItems}
          discount={discount}
          subtotal={subtotal}
          tax={tax}
          tip={tip}
          total={total}
        />

        <Button
          variant="outline"
          className="flex-1 border-customPrimary-500 text-customPrimary-500 hover:bg-customPrimary-50 rounded-2xl"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <Button
        className="w-full bg-customPrimary-500 hover:bg-customPrimary-600 rounded-2xl"
        onClick={handlePrint}
      >
        Print Order Slip
      </Button>
    </div>
  );
}

// discount , tips , note dialog
interface CustomDialogProps {
  title: string;
  triggerText: string;
  children: ReactNode;
  dialogName: string;
  activeDialog: string | null;
  setActiveDialog: (dialogName: string | null) => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  triggerText,
  children,
  dialogName,
  activeDialog,
  setActiveDialog,
}) => {
  return (
    <Dialog
      variants={customVariants}
      transition={customTransition}
      open={activeDialog === dialogName}
      onOpenChange={(open) => setActiveDialog(open ? dialogName : null)}
    >
      <DialogTrigger className="text-customPrimary-500 hover:text-customPrimary-600 pb-1">
        {triggerText}
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-white p-6">
        <div className="w-full space-y-6 p-4">
          <h2 className="text-xl font-medium text-customPrimary-500">
            {title}
          </h2>
          {children}
          <NextButton
            className="w-full bg-customPrimary-500 hover:bg-customPrimary-600 text-white"
            onPress={() => setActiveDialog(null)}
          >
            Add
          </NextButton>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

// checkout dialog
const allTables = [
  "Table 1",
  "Table 2",
  "Table 3",
  "Table 4",
  "Table 5",
  "Table 6",
  "Table 7",
  "Table 8",
  "Table 9",
  "Table 10",
];
const bookedTables = ["Table 2", "Table 4"];

interface CheckoutDialogProps {
  menuItems: { title: string; quantity: number; price: number }[];
  discount: number;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
}

const CheckoutDialog = ({
  menuItems,
  discount,
  subtotal,
  tax,
  tip,
  total,
}: CheckoutDialogProps) => {
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const handleNext = () => setStep(2);
  const handlePrevious = () => setStep(1);

  return (
    <Dialog variants={customVariants} transition={customTransition}>
      <DialogTrigger className="flex-1 bg-customPrimary-500 hover:bg-customPrimary-600 rounded-2xl text-white">
        Add Details
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl bg-white p-8">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-2xl text-customPrimary-500">
            Fill up details
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                step === 1
                  ? "bg-customPrimary-500 text-white"
                  : "border-gray-400"
              }`}
            >
              1
            </div>
            <div className="w-12 h-1 bg-gray-400"></div>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                step === 2
                  ? "bg-customPrimary-500 text-white"
                  : "border-gray-400"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Step 1: Customer Details Form */}
        {step === 1 && (
          <div className="grid grid-cols-4 gap-5 ">
            <Label htmlFor="name">Customer Name</Label>
            <Input
              className="col-span-3"
              placeholder="Enter customer name"
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Label htmlFor="email">Customer Email</Label>
            <Input
              className="col-span-3"
              placeholder="Enter customer email"
              id="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <Label htmlFor="phone">Customer Number</Label>
            <Input
              className="col-span-3"
              placeholder="Enter phone number"
              type="tel"
              id="phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
            <Label htmlFor="table">Select Table</Label>
            <div className="col-span-3">
              <MultiSelectButtonGroup
                options={allTables}
                selectedOptions={selectedTables}
                disabledOptions={bookedTables}
                onChange={setSelectedTables}
              />
            </div>

            <div className="col-span-4 flex justify-end">
              <Button
                onClick={handleNext}
                className="bg-customPrimary-500 border text-white hover:border-customPrimary-500 hover:bg-transparent hover:text-customPrimary-500"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Show Customer Info and Order Summary */}
        {step === 2 && (
          <Card className="w-full max-w-2xl mx-auto bg-white shadow rounded-lg overflow-hidden ">
            <CardHeader className="bg-gradient-to-r from-customPrimary-500 to-customPrimary-600 text-white p-6">
              <CardTitle className="text-2xl font-bold">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="text-gray-600">Name</p>
                      <p className="text-gray-600">Email</p>
                      <p className="text-gray-600">Phone</p>
                      <p className="text-gray-600">Table</p>
                    </div>
                    <div className="space-y-2 font-medium">
                      <p>{customerName || "N/A"}</p>
                      <p>{customerEmail || "N/A"}</p>
                      <p>{customerPhone || "N/A"}</p>
                      <p>{selectedTables.join(", ") || "N/A"}</p>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Ordered Items
                  </h3>
                  <div className="space-y-2">
                    {menuItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="font-medium">{item.title}</span>
                        <span className="text-gray-600">
                          £{(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-semibold text-customPrimary-600 mb-3">
                    Order Total
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">
                        -£{discount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT (2%)</span>
                      <span>£{tax.toFixed(2)}</span>
                    </div>
                    {tip > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tip</span>
                        <span>£{tip.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
                      <span className="text-customPrimary-600">Total</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6">
              <div className="flex justify-between w-full">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <Button className="bg-customPrimary-500 text-white hover:bg-customPrimary-600 flex items-center space-x-2">
                  <span>Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};
