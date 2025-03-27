import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";

interface Order {
  orderId: string;
  customerName: string;
  status: "Completed" | "Processing" | "Canceled";
}

const orders: Order[] = [
  { orderId: "ABC123abc", customerName: "Wade Warren", status: "Completed" },
  {
    orderId: "ABC123abc",
    customerName: "Marvin McKinney",
    status: "Processing",
  },
  { orderId: "ABC123abc", customerName: "Bessie Cooper", status: "Canceled" },
  {
    orderId: "ABC123abc",
    customerName: "Marvin McKinney",
    status: "Processing",
  },
  { orderId: "ABC123abc", customerName: "Wade Warren", status: "Completed" },
  {
    orderId: "ABC123abc",
    customerName: "Marvin McKinney",
    status: "Processing",
  },
  { orderId: "ABC123abc", customerName: "Bessie Cooper", status: "Canceled" },
];

export default function OrderTable() {
  return (
    <div className="relative w-full container mx-auto p-6">
      {/* Background Images in Four Corners */}
      <Image
        src="/image/display/img-2.png"
        alt="Corner Decoration"
        width={150}
        height={150}
        className="absolute top-0 left-0 opacity-50"
      />
      <Image
        src="/image/display/img-1.png"
        alt="Corner Decoration"
        width={100}
        height={100}
        className="absolute top-0 right-0 opacity-50"
      />
      <Image
        src="/image/display/img-3.png"
        alt="Corner Decoration"
        width={150}
        height={150}
        className="absolute bottom-0 left-0 opacity-50"
      />
      <Image
        src="/image/display/img-4.jpg"
        alt="Corner Decoration"
        width={300}
        height={300}
        className="absolute bottom-10 right-10 opacity-50"
      />

      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="rounded-full p-2">
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

      {/* Table Container */}
      <div className="relative w-full  mx-auto p-6 bg-white/30 rounded-lg shadow">
        <Table className="rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-white ">
              {["Order ID", "Customer Name", "Order Status"].map(
                (header, index) => (
                  <TableHead
                    key={index}
                    className={`w-1/3 py-5 px-4 text-3xl text-customPrimary-500 ${
                      index === 0
                        ? "text-left"
                        : index === 1
                        ? "text-center"
                        : "text-right"
                    }`}
                  >
                    {header}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} className="even:bg-gray-50">
                {[order.orderId, order.customerName, order.status].map(
                  (value, idx) => (
                    <TableCell
                      key={idx}
                      className={`py-5 px-4 w-1/3 text-xl font-medium ${
                        idx === 0
                          ? "text-left"
                          : idx === 1
                          ? "text-center  "
                          : "text-right"
                      }`}
                    >
                      {idx === 2 ? (
                        <Badge
                          variant="secondary"
                          className={`rounded-full px-2 py-1 text-sm font-medium ${
                            value === "Completed"
                              ? "bg-green-100 text-green-700"
                              : value === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {value}
                        </Badge>
                      ) : (
                        value
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
