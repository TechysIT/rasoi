"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

const salesData = [
  { category: "Beverages", value: 1500 },
  { category: "Appetizers", value: 2200 },
  { category: "Main Course", value: 3100 },
  { category: "Desserts", value: 2000 },
];

const orderData = [
  { name: "Dine - In", value: 60, color: "#ff7b00" },
  { name: "Takeout", value: 25, color: "#ff9736" },
  { name: "Delivery", value: 15, color: "#8b4513" },
];

export default function AnalyticsDashboard() {
  return (
    <div className="grid gap-8 md:grid-cols-3 p-6">
      {/* Sales Breakdown */}
      <div className="bg-white rounded-xl p-6 col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium">Sales Breakdown</h2>
          <Select defaultValue="category">
            <SelectTrigger className="w-[120px] border-customPrimary-500 text-customPrimary-500">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8">
          <div className="text-xs text-gray-500">This Month</div>
          <div className="text-2xl font-medium">290,342.23</div>
          <div className="text-xs text-gray-500">Nov</div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{ top: 5, right: 5, bottom: 5, left: 20 }}
            >
              <CartesianGrid vertical={false} stroke="#f5f5f5" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ff7b00"
                strokeWidth={2}
                dot={{ fill: "#ff7b00", r: 4 }}
              />
              <XAxis
                dataKey="category"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280" }}
                tickFormatter={(value) => `£${value}k`}
                ticks={[1000, 2000, 3000, 4000]}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #f5f5f5",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Analysis */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium">Order Analysis</h2>
          <Select defaultValue="revenue">
            <SelectTrigger className="w-[120px] text-gray-500">
              <SelectValue placeholder="Revenue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
              <SelectItem value="items">Items</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {orderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="middle" align="left" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
