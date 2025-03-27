"use client";

// Global imports
import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Menu,
} from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { InventoryGRNData } from "@/utils/Types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { customTransition, customVariants } from "@/lib/constant";
import { Label } from "../ui/label";
import { Switch } from "@heroui/switch";
import { cn } from "@/utils/cn";
import { Button as HeroButton } from "@heroui/react";

export const columns: ColumnDef<InventoryGRNData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="border-customPrimary-500 data-[state=checked]:bg-customPrimary-500 data-[state=checked]:text-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-customPrimary-500 data-[state=checked]:bg-customPrimary-500 data-[state=checked]:text-white"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "GRN ID",
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Item Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("supplier")}</div>
    ),
  },
  {
    accessorKey: "receivedDate",
    header: "Received Date",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("receivedDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "receivedBy",
    header: "Received By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("receivedBy")}</div>
    ),
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("qty")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="lowercase">£{row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "items",
    header: "Total Items",
    cell: ({ row }) => <div>{row.getValue("items")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-5 w-5 p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Menu className="h-4 w-4 text-customPrimary-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white px-3 py-3 rounded-lg text-customPrimary-500 max-w-44"
          >
            <DropdownMenuItem className="capitalize hover:bg-customPrimary-50">
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:bg-customPrimary-50">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:bg-customPrimary-50">
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:bg-customPrimary-50">
              Print Invoice
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:bg-customPrimary-50">
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function OrderGRNTable({ data }: { data: InventoryGRNData[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 9,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex space-x-4 my-5 justify-between">
        {/* filter and search  */}
        <div className="flex space-x-3">
          {/* filter  */}

          <Input
            placeholder="Find order..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-9 max-w-64 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-customPrimary-500"
          />
          {/* of on coloum  */}
          <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                className="ml-auto bg-customPrimary-500  rounded-lg hover:bg-customPrimary-50 hover:text-black border hover:border-customPrimary-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                // onClick={() => setIsOpen(!isOpen)}
              >
                Options
                {isOpen ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white text-customPrimary-500 "
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      role="menuitemcheckbox"
                      key={column.id}
                      className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500 "
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* other buttons  */}
        <AddGRN />
      </div>

      {/* table  */}
      <div className="h-[67vh] 2xl:h-[62vh] w-full overflow-auto rounded-md border scrollbar-hide relative">
        <Table className="bg-white min-w-max scrollbar-hide  w-full relative">
          <TableHeader className="sticky top-0 bg-customPrimary-50 z-20 shadow ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-customPrimary-50"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-customPrimary-500 px-6 py-3 2xl:py-5  whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-white "
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-3 2xl:py-4 whitespace-nowrap "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center hover:bg-white"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination  */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground ">
          {table.getFilteredSelectedRowModel().rows.length}
          <span className="px-1">of</span>
          {table.getFilteredRowModel().rows.length} rows selected.
        </div>
        <div className="space-x-2">
          <Button
            className="bg-customPrimary-500 hover:bg-customPrimary-100"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="bg-customPrimary-500 hover:bg-customPrimary-100"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

const AddGRN = () => {
  // State for form data
  const [formData, setFormData] = useState<Omit<InventoryGRNData, "id">>({
    name: "",
    supplier: "",
    recivedDate: "",
    recivedby: "",
    qty: 0,
    category: "",
    amount: 0,
    items: 0,
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "qty" || id === "amount" || id === "items"
          ? Number(value)
          : value,
    }));
  };

  // Handle form submission (dummy handler for now)
  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-transparent text-customPrimary-500 text-md">
        Add item +
      </DialogTrigger>
      <DialogContent className="bg-white p-6 w-[480px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-customPrimary-500">
            Add Stock Item
          </DialogTitle>
        </DialogHeader>
        <DialogClose />

        {/* Form Inputs */}
        <div className="grid grid-cols-4 gap-5 pt-7 pb-3">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Enter Category"
            value={formData.category}
            onChange={handleInputChange}
            className="col-span-3"
          />

          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            placeholder="Enter Item Name"
            value={formData.name}
            onChange={handleInputChange}
            className="col-span-3"
          />

          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            placeholder="Enter Supplier Name"
            value={formData.supplier}
            onChange={handleInputChange}
            className="col-span-3"
          />

          <Label htmlFor="recivedDate">Received Date</Label>
          <Input
            id="recivedDate"
            type="date"
            value={formData.recivedDate}
            onChange={handleInputChange}
            className="col-span-3"
          />

          <Label htmlFor="recivedby">Received By</Label>
          <Input
            id="recivedby"
            placeholder="Enter Received By"
            value={formData.recivedby}
            onChange={handleInputChange}
            className="col-span-3"
          />

          <Label htmlFor="qty">Quantity</Label>
          <Input
            id="qty"
            type="number"
            placeholder="Enter Quantity"
            value={formData.qty}
            onChange={handleInputChange}
            className="col-span-3"
          />

          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="col-span-3"
          />

          <Label htmlFor="items">Number of Items</Label>
          <Input
            id="items"
            type="number"
            placeholder="Enter Number of Items"
            value={formData.items}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <HeroButton
            size="sm"
            className="bg-customPrimary-500 text-white"
            onClick={handleSubmit}
          >
            Add Item
          </HeroButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
