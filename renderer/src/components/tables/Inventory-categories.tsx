// Global imports
import * as React from "react";
import { useEffect, useState } from "react";
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

import { cn, Button as HeroButton } from "@heroui/react";
import { InventoryCategoryData } from "@/utils/Types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog-cn";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import NotFound from "../error/NotFound";

export function InventoryCategoryTable({
  data,
  refreshPage,
}: {
  data: InventoryCategoryData[];
  refreshPage: () => void;
}) {
  // coloum sturture
  const columns: ColumnDef<InventoryCategoryData>[] = [
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
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const categoryId = row.getValue("id");
        const status = row.getValue("status");
        const [isChecked, setIsChecked] = useState(status === 1);

        useEffect(() => {
          setIsChecked(status === 1);
        }, [status]);

        const handleStatusChange = async (checked: boolean) => {
          setIsChecked(checked);
          try {
            const result = await window.ipc.invoke("updateCategoryStatus", {
              categoryId,
              newStatus: checked,
            });

            if (result.success) {
              console.log("Status updated successfully");
            } else {
              console.warn("Failed to update status:", result.message);
            }
          } catch (error) {
            console.error("Error updating status:", error);
          }
        };

        return (
          <Switch
            checked={isChecked}
            onCheckedChange={handleStatusChange}
            className="bg-customPrimary-500"
          />
        );
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
              className="capitalize bg-white px-3 py-3 rounded-lg text-customPrimary-500 max-w-44"
            >
              <DropdownMenuItem className=" hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500">
                View
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500">
                Edit
              </DropdownMenuItem>

              <DeleteWithConfirmation
                id={row.original.id}
                onDelete={refreshPage}
                name={row.original.name}
              />

              <DropdownMenuItem className="hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500">
                Clone
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
          <Input
            placeholder="Find order..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-9 max-w-64 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-customPrimary-500"
          />

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
        <AddCategory />
      </div>

      {/* table  */}
      <div className="h-fit  w-full overflow-auto rounded-md border scrollbar-hide relative">
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
                  <NotFound />
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

const AddCategory = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-transparent text-customPrimary-500  text-md">
        Add item +
      </DialogTrigger>
      <DialogContent className="bg-white p-6 w-[480px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-customPrimary-500">
            Add Stock Item
          </DialogTitle>
        </DialogHeader>
        <DialogClose />
        <div className="grid grid-cols-4 gap-5 pt-7 pb-3">
          <Label htmlFor="name">Category</Label>
          <Input
            id="name"
            placeholder="Enter Item Name"
            className="col-span-3"
          />
          <Label htmlFor="idx">Index</Label>
          <Input
            id="idx"
            placeholder="Enter Quantity"
            type="number"
            className="col-span-3"
          />

          <Label htmlFor="status" className="grid grid-cols-1">
            Status <span className="text-xs text-gray-400">(On or Off)</span>
          </Label>
        </div>
        <div className="flex justify-end space-x-3">
          <HeroButton size="sm" className="bg-customPrimary-500  text-white">
            Add Item
          </HeroButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DeleteWithConfirmation = ({
  id,
  name,
  onDelete,
}: {
  id: string;
  name?: string;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState(false);

  console.log("DeleteWithConfirmation id:", id);

  const handleDelete = async () => {
    try {
      await window.ipc.invoke("deleteCategory", id);
      toast.success(`Category ${name} deleted successfully.`, {
        duration: 3000,
      });
      setOpen(false);
      onDelete();
    } catch (error) {
      toast.error("Error deleting category. Please try again.", {
        duration: 3000,
      });
      console.error("Error deleting category:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500 text-sm w-full py-1.5 rounded-sm text-start px-2">
        Delete
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone. Are you sure you want to delete this
          item?
        </p>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
