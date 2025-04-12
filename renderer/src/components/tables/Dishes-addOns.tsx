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
import { Button as HeroButton } from "@heroui/button";
import { AddOnsTypes } from "@/utils/Types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "@heroui/switch";
import { cn } from "@/utils/cn";
import { timeConverter } from "@/utils/timeConverter";

export const columns: ColumnDef<AddOnsTypes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
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
    accessorKey: "name",
    header: "Add-On Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price (£)",
    cell: ({ row }) => <div>£{row.getValue("price")}</div>,
  },
  {
    accessorKey: "dishName",
    header: "Dish",
    cell: ({ row }) => <div>{row.getValue("dishName")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <div>{timeConverter(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => <div>{timeConverter(row.getValue("updatedAt"))}</div>,
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
            <DropdownMenuItem className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50">
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50">
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50">
              Clone
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DishesAddonsTable({ data }: { data: AddOnsTypes[] }) {
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
        <div className="flex space-x-5">
          <HeroButton
            radius="sm"
            size="sm"
            className="bg-customPrimary-400 text-white min-h-9 text-md"
          >
            Import/Export
          </HeroButton>
          <AddDishAddons />
        </div>
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

const AddDishAddons = () => {
  // State for form data without the id
  const [formData, setFormData] = useState<Omit<AddOnsTypes, "id">>({
    name: "",
    price: 0,
    dishId: "",
    storeId: "",
    createdAt: "",
    updatedAt: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox" ? checked : id === "price" ? Number(value) : value,
    }));
  };

  // Handle form submission (dummy handler for now)
  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-customPrimary-500 text-white rounded-lg p-2">
        Add Add-ons +
      </DialogTrigger>
      <DialogContent className="bg-white p-6 w-[480px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-customPrimary-500">
            Add Add-Ons
          </DialogTitle>
        </DialogHeader>
        <DialogClose />

        {/* Form Inputs */}
        <div className="grid grid-cols-4 gap-5 pt-7 pb-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleInputChange}
            className="col-span-3"
          />

          {/* 
          <Label htmlFor="mandatory" className="mt-3">
            Mandatory
          </Label>
          <div className="col-span-3">
            <Switch
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full items-center justify-between cursor-pointer rounded-lg gap-2 p-4 border-transparent",
                  "bg-transparent hover:bg-none",
                  "data-[selected=true]:bg-none"
                ),
                wrapper: cn(
                  "p-0 h-4 overflow-visible",
                  "group-data-[selected=true]:bg-orange-500"
                ),
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg transition-all",
                  "group-data-[hover=true]:border-orange-500",
                  "group-data-[selected=true]:ms-6",
                  "group-data-[selected=true]:bg-white",
                  "group-data-[selected=true]:border-orange-500",
                  "group-data-[pressed=true]:w-6",
                  "group-data-[selected]:group-data-[pressed]:ms-4"
                ),
              }}
            />
          </div> */}

          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleInputChange}
            className="col-span-3"
          />

          {/* <Label htmlFor="createdBy">Created By</Label>
          <Input
            id="createdBy"
            placeholder="Enter Creator's Name"
            value={formData.createdBy}
            onChange={handleInputChange}
            className="col-span-3"
          /> */}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <HeroButton
            size="sm"
            className="bg-customPrimary-500 text-white"
            onClick={handleSubmit}
          >
            Add AddOn
          </HeroButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
