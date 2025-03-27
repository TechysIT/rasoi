import Image from "next/image";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  vat: number;
  discount: number;
  totalPrice: number;
}

const orders: Order[] = [
  {
    orderId: "ABC123abc",
    items: [
      { name: "Chicken Curry", quantity: 1, price: 309.5 },
      { name: "Paneer Tikka", quantity: 2, price: 309.5 },
      { name: "Dal Makhani", quantity: 1, price: 309.5 },
    ],
    vat: 30.95,
    discount: 10.0,
    totalPrice: 929.5,
  },
];

function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

export default function OrderTable() {
  const order = orders[0]; // Show only the first order

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className=" rounded-full p-2">
          <Image
            alt="logo"
            src={"/logo.png"}
            width={30}
            height={30}
            className="object-cover rounded-full"
          />
        </div>
        <h1 className="text-3xl font-bold text-customPrimary-500">
          Techy&apos;s
        </h1>
      </div>

      {/* Order Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Order ID */}
        <div className="text-lg font-semibold text-gray-800">
          Order ID: <span className="text-orange-500">{order.orderId}</span>
        </div>

        {/* Items Ordered */}
        <Table className="w-full border rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-600">
              <TableHead className="w-1/3 text-left py-3 px-4">Item</TableHead>
              <TableHead className="w-1/3 text-center py-3 px-4">
                Quantity
              </TableHead>
              <TableHead className="w-1/3 text-right py-3 px-4">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index} className="even:bg-gray-50">
                <TableCell className="w-1/3 py-3 px-4">{item.name}</TableCell>
                <TableCell className="w-1/3 py-3 px-4 text-center">
                  {item.quantity}
                </TableCell>
                <TableCell className="w-1/3 py-3 px-4 text-right">
                  {formatPrice(item.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="mx-auto py-1 rounded-full  bg-customPrimary-50" />
        {/* Total Prices */}
        <div className="text-right space-y-1 pt-4">
          <div>VAT: {formatPrice(order.vat)}</div>
          <div>Discount: -{formatPrice(order.discount)}</div>
          <div className="text-lg font-bold text-customPrimary-500">
            Total: {formatPrice(order.totalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
