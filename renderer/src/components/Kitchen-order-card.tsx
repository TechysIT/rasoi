import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type OrderStatus = "New" | "Processing" | "Completed" | "Canceled";
type Priority = "High" | "Medium" | "Low";

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  note: string;
  placedAt: string;
  priority: Priority;
  status: OrderStatus;
}

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="text-orange-500 font-medium">Order ID: {order.id}</h3>

      <div className="space-y-2">
        <div className="font-medium">Item List:</div>
        {order.items.map((item, index) => (
          <div key={index} className="pl-2">
            {item.name} x{item.quantity}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <div className="font-medium">Note:</div>
        <div className="text-sm">{order.note || "N/A"}</div>
      </div>

      <div className="space-y-1">
        <div className="font-medium">Placed at:</div>
        <div className="text-sm">{order.placedAt}</div>
      </div>

      <div className="space-y-1">
        <div className="font-medium">Priority:</div>
        <div className="text-sm">{order.priority}</div>
      </div>

      <div className="space-y-1">
        <div className="font-medium">Status:</div>
        <Badge
          className={cn(
            "w-28 justify-between",
            order.status === "New" && "bg-orange-500 hover:bg-orange-500",
            order.status === "Processing" && "bg-blue-500 hover:bg-blue-500",
            order.status === "Completed" && "bg-green-500 hover:bg-green-500",
            order.status === "Canceled" && "bg-red-500 hover:bg-red-500"
          )}
        >
          {order.status}
          <ChevronDown className="h-4 w-4" />
        </Badge>
      </div>
    </div>
  );
}
