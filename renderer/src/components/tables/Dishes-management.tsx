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
  Minus,
  Plus,
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
import { Button as NextButton } from "@heroui/button";
import { DishesManagementData, CategoryTypes } from "@/utils/Types";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaTrashCan } from "react-icons/fa6";
import { FileUploader } from "react-drag-drop-files";
import { customTransition, customVariants } from "@/lib/constant";
import { Input as HeroInput, Textarea } from "@heroui/input";
import { categories } from "@/lib/data";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { timeConverter } from "@/utils/timeConverter";

export const columns: ColumnDef<DishesManagementData>[] = [
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-12 h-12 relative">
        <Image
          src={row.getValue("imageUrl") || "/placeholder.png"}
          alt={row.getValue("name") || "Dish"}
          fill
          className="rounded-md object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Dish Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categoryName")}</div>
    ),
  },
  {
    accessorKey: "addons",
    header: "Addons",
    cell: ({ row }) => {
      const addons = row.getValue("addons") as { name: string }[];
      const addonNames = addons.map((a) => a.name).join(", ");
      return <div>{addonNames || "—"}</div>;
    },
  },
  {
    accessorKey: "dishInventories",
    header: "Ingredients",
    cell: ({ row }) => {
      const inventories = row.getValue("dishInventories") as {
        itemName: string;
      }[];
      const ingredientNames = inventories.map((inv) => inv.itemName).join(", ");
      return <div>{ingredientNames || "—"}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Cost (£)",
    cell: ({ row }) => <div>£{row.getValue("price")}</div>,
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
  },
  {
    accessorKey: "itemDetails",
    header: "Dish Details",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("itemDetails")}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("rating")}</div>
    ),
  },
  {
    accessorKey: "bowls",
    header: "Bowls",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("bowls")}</div>
    ),
  },
  {
    accessorKey: "persons",
    header: "Persons",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("persons")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{timeConverter(row.getValue("createdAt"))}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return <div>{timeConverter(row.getValue("updatedAt"))}</div>;
    },
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

export function DishesManagementTable({
  data,
}: {
  data: DishesManagementData[];
}) {
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
        </div>

        {/* other buttons  */}
        <div className="flex space-x-5">
          <AddDish category={categories} />

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

// add dish model
const AddDish = ({ category }: { category?: CategoryTypes }) => {
  const [images, setImages] = useState<File[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleImageChange = (files: File[]) => {
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleIncrease = () => setQuantity((prev) => Math.min(prev + 1));
  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const tags = ["Mobile", "Laptop", "Car"];

  return (
    <Dialog variants={customVariants} transition={customTransition}>
      <DialogTrigger className="rounded-lg bg-customPrimary-500 text-white border border-customPrimary-500 hover:bg-customPrimary-50 hover:text-customPrimary-500 px-2">
        Add New Dish
      </DialogTrigger>
      <DialogContent className="w-full max-w-5xl bg-white p-6 z-[10000]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-customPrimary-500 text-xl font-medium">
            Add Dish
          </DialogTitle>
        </DialogHeader>

        <div className="py-5 grid grid-cols-3 gap-4">
          {/* Dish Image Upload */}
          <Label htmlFor="image">Dish Image</Label>
          <div className="grid grid-cols-6 gap-5 col-span-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-20 h-20 border-2 border-dashed cursor-pointer rounded-xl border-customPrimary-200 relative group"
              >
                <Image
                  id="image"
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl p-1"
                  fill
                />
                {/* Delete Icon */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300 ease-in-out"
                  onClick={() => handleDeleteImage(index)}
                >
                  <FaTrashCan className="text-red-500" size={24} />
                </div>
              </div>
            ))}

            <FileUploader
              multiple
              name="images"
              types={["jpg", "png", "jpeg"]}
              handleChange={handleImageChange}
            >
              <div className="w-20 h-20 border-2 border-dashed flex justify-center items-center cursor-pointer rounded-xl text-customPrimary-500 border-customPrimary-200">
                <Plus />
              </div>
            </FileUploader>
          </div>

          {/* Name */}
          <Label htmlFor="name">Name</Label>
          <HeroInput
            name="name"
            id="name"
            type="text"
            required
            radius="sm"
            size="sm"
            placeholder="Enter product name"
            classNames={{
              base: "col-span-2",
              inputWrapper: "bg-white border border-black/50",
            }}
          />

          {/* Description */}
          <Label>Description</Label>
          <Textarea
            name="description"
            id="description"
            required
            radius="sm"
            size="sm"
            placeholder="Enter product description"
            classNames={{
              base: "col-span-2",
              inputWrapper: "bg-white border border-black/50",
            }}
          />

          {/* Price */}
          <Label htmlFor="price">Price</Label>
          <HeroInput
            name="price"
            id="price"
            type="number"
            required
            radius="sm"
            size="sm"
            placeholder="Enter product price"
            classNames={{
              base: "col-span-2",
              inputWrapper: "bg-white border border-black/50",
            }}
          />

          {/* Quantity */}
          <Label htmlFor="items" className="grid col-span-1">
            Ingrediants x Quantity{" "}
            <span className="text-xs text-gray-500">
              (Excluding from items used in selected dish options)
            </span>
          </Label>
          <div className="col-span-2 flex items-center space-x-4" id="items">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Items" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {[
                  { value: "chicken", label: "Chicken" },
                  { value: "beef", label: "Beef" },
                  { value: "fish", label: "Fish" },
                  { value: "vegetables", label: "Vegetables" },
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>x</span>
            <div className="flex items-center space-x-4 ">
              <span
                className="border bg-gray-200 rounded-full cursor-pointer p-1"
                onClick={handleDecrease}
              >
                <Minus size={14} />
              </span>
              <span>{quantity}</span>
              <span
                className="border bg-black text-white rounded-full cursor-pointer p-1"
                onClick={handleIncrease}
              >
                <Plus size={14} color="white" />
              </span>
            </div>
          </div>
          {/* category  */}
          <Label htmlFor="category">Category</Label>
          <div className="col-span-2" id="category">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="relative z-[9999]">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <Label htmlFor="tags">Tags</Label>
          <div className="col-span-2" id="tags">
            <HeroInput
              name="tags"
              type="text"
              required
              radius="sm"
              size="sm"
              placeholder="Enter tags..."
              classNames={{
                inputWrapper: "bg-white border border-black/50",
              }}
            />
            <p className="space-x-2 py-2 text-xs text-customPrimary-500">
              Suggested tags:
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="ml-2 text-black bg-customPrimary-50 rounded-sm px-1 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end items-center gap-4 mt-4">
          <NextButton className="bg-transparent  ">Reset</NextButton>
          <NextButton className="bg-customPrimary-500 text-white ">
            Add
          </NextButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
