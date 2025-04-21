// Global Imports
import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

// Local Imports

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Graph from "@/components/Graph";
import Chart from "@/components/Chart";

const tableData = [
  {
    invoice: "Product A",
    productId: "001",
    category: "Category 1",
    remainingQuantity: 100,
    turnover: "$1,000.00",
    increaseBy: "10%",
  },
  {
    invoice: "Product B",
    productId: "002",
    category: "Category 2",
    remainingQuantity: 50,
    turnover: "$500.00",
    increaseBy: "-5%",
  },
  {
    invoice: "Product C",
    productId: "003",
    category: "Category 3",
    remainingQuantity: 75,
    turnover: "$750.00",
    increaseBy: "0%",
  },
  {
    invoice: "Product D",
    productId: "004",
    category: "Category 4",
    remainingQuantity: 120,
    turnover: "$1,200.00",
    increaseBy: "12%",
  },
];

const Report = () => {
  return (
    <div className="overflow-auto w-full h-full container pb-10">
      {/* title and download button  */}
      <div className="flex justify-between items-center">
        <h5 className="text-h5 font-semibold">Report</h5>
        <Button
          radius="sm"
          className="bg-customPrimary-50 border border-customPrimary-500 text-customPrimary-500 "
        >
          Download Reports
          <Image src={"/icon/file.svg"} alt="file" width={20} height={20} />
        </Button>
      </div>

      {/* card that show sales revenue etc */}

      <div className="grid grid-cols-3 gap-5 my-5">
        <DetailsCard
          title="Total Revenue"
          previousLabel="Previous"
          previousValue="July"
          revenueLabel="Revenue"
          revenueValue="$18,300"
          changePercentage="12.67 %"
          isPositiveChange={true}
        />
        <DetailsCard
          title="Sales"
          previousLabel="Previous Period"
          previousValue="July"
          revenueLabel="Sales"
          revenueValue="$18,300"
          changePercentage="12.67 %"
          isPositiveChange={false}
        />
        <DetailsCard
          title="New Customers"
          previousLabel="Previous Period"
          previousValue="July"
          revenueLabel="Customers"
          revenueValue="$18,300"
          changePercentage="12.67 %"
          isPositiveChange={false}
        />
      </div>

      {/* chart & graph  */}
      <div className="">
        <Graph />
        {/* <Chart /> */}
      </div>

      <h5 className="text-body font-semibold text-customPrimary-500 mt-10 mb-5">
        Financial Information
      </h5>
      {/* table  */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Product ID</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Remaining Quantity</TableHead>
            <TableHead className="text-center">Turnover</TableHead>
            <TableHead className="text-right">Increase by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.invoice}</TableCell>
              <TableCell className="text-center">{item.productId}</TableCell>
              <TableCell className="text-center">{item.category}</TableCell>
              <TableCell className="text-center">
                {item.remainingQuantity}
              </TableCell>
              <TableCell className="text-center">{item.turnover}</TableCell>
              <TableCell
                className={`text-right ${
                  parseFloat(item.increaseBy) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.increaseBy}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* Uncomment and adjust if you need a footer */}
        {/* <TableFooter>
      <TableRow>
        <TableCell colSpan={5}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
      </TableRow>
    </TableFooter> */}
      </Table>
    </div>
  );
};

export default Report;

// sales , revenue etc card comp

interface DetailsCardProps {
  title: string;
  previousLabel: string;
  previousValue: string;
  revenueLabel: string;
  revenueValue: string;
  changePercentage: string;
  isPositiveChange: boolean;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  title,
  previousLabel,
  previousValue,
  revenueLabel,
  revenueValue,
  changePercentage,
  isPositiveChange,
}) => {
  return (
    <div className="bg-customPrimary-50 p-5 rounded-3xl">
      <h5 className="text-body font-medium text-customPrimary-500">{title}</h5>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <h5 className="text-tag text-black/50 font-semibold mt-2 mb-1">
            {previousLabel}
          </h5>
          <p>{previousValue}</p>
        </div>
        <div>
          <h5 className="text-tag text-black/50 font-semibold mt-2 mb-1">
            {revenueLabel}
          </h5>
          <p className="flex justify-start items-center">
            {revenueValue}
            <span
              className={`ml-1 ${
                isPositiveChange ? "text-green-500" : "text-red-500"
              } flex justify-center items-center`}
            >
              {isPositiveChange ? (
                <IoIosArrowRoundUp />
              ) : (
                <IoIosArrowRoundDown />
              )}
              {changePercentage}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
