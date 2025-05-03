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
import { Button as HeroButton } from "@heroui/button";
import { UserList } from "@/utils/Types";
import { customTransition, customVariants } from "@/lib/constant";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { timeConverter } from "@/utils/timeConverter";
import NotFound from "../error/NotFound";

// coloum sturture
export const columns: ColumnDef<UserList>[] = [
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
    accessorKey: "avatarPath",
    header: "Photo",
    cell: ({ row }) => {
      const avatar = row.getValue("avatarPath") as string;
      const imageUrl = avatar || "/placeholder.png";
      return (
        <Image
          src={imageUrl}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      );
    },
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return <div className="capitalize">{`${firstName} ${lastName}`}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone") || "N/A"}</div>,
  },

  {
    accessorKey: "roleName",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },

  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => (
      <div className="lowercase">
        {timeConverter(row.getValue("lastLogin"))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="lowercase">
        {timeConverter(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="lowercase">
        {timeConverter(row.getValue("updatedAt"))}
      </div>
    ),
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
            <DropdownMenuItem className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500">
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize hover:text-customPrimary-500 hover:bg-customPrimary-50 focus:bg-customPrimary-50 focus:text-customPrimary-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function UserTable({ data }: { data: UserList[] }) {
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
          />{" "}
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
          <AddUser />
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

// add user

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    franchise: "",
    role: "",
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const now = new Date().toISOString();
    const newUser = {
      ...formData,
      id: crypto.randomUUID(),
      lastLogin: now,
      createdOn: now,
    };
    console.log("New user:", newUser);
  };

  return (
    <Dialog variants={customVariants} transition={customTransition}>
      <DialogTrigger className="bg-transparent text-customPrimary-500 text-md">
        Add User +
      </DialogTrigger>
      <DialogContent className="bg-white p-6 w-[480px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-customPrimary-500">
            Add New User
          </DialogTitle>
        </DialogHeader>
        <DialogClose />
        <div className="grid grid-cols-4 gap-5 pt-7 pb-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter Name"
            className="col-span-3"
            onChange={handleInputChange}
          />

          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter Email"
            className="col-span-3"
            onChange={handleInputChange}
          />

          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter Phone"
            className="col-span-3"
            onChange={handleInputChange}
          />

          <Label htmlFor="franchise">Franchise</Label>
          <Input
            id="franchise"
            placeholder="Enter Franchise"
            className="col-span-3"
            onChange={handleInputChange}
          />

          <Label htmlFor="role">Role</Label>
          <div className="col-span-3">
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <HeroButton
            size="sm"
            className="bg-customPrimary-500 text-white"
            onClick={handleSubmit}
          >
            Add User
          </HeroButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
