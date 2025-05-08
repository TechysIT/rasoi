// Global imports
import * as React from "react";
import { useEffect, useRef, useState } from "react";
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
  Trash,
  Upload,
} from "lucide-react";
import { Loader } from "lucide-react";

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog-cn";
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
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function UserTable({
  data,
  storeId,
  refreshPage,
}: {
  data: UserList[];
  storeId: string;
  refreshPage: () => void;
}) {
  // coloum sturture
  const columns: ColumnDef<UserList>[] = [
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone") || "N/A"}</div>,
    },
    {
      accessorKey: "roleName",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("roleName")}</div>
      ),
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
        <div className="flex space-x-3">
          {/* filter  */}
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
        <div className="flex space-x-5">
          <HeroButton
            radius="sm"
            size="sm"
            className="bg-customPrimary-400 text-white min-h-9 text-md"
          >
            Import/Export
          </HeroButton>
          <AddUser storeId={storeId} refreshPage={refreshPage} />
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

// add or edit user

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is too short"),
  address: z.string().optional(),
  roleId: z.string().min(1, "Role is required"),

  storeId: z.string(),
});

type UserFormData = z.infer<typeof userSchema>;

function AddUser({
  storeId,
  user,
  refreshPage,
}: {
  storeId: string;
  user?: any;
  refreshPage: () => void;
}) {
  const [roles, setRoles] = useState([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!user;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      roleId: "",

      storeId,
    },
  });

  useEffect(() => {
    window.ipc.invoke("getRoles", storeId).then(setRoles);
  }, [storeId]);

  useEffect(() => {
    if (user) {
      reset({ ...user, storeId: user.storeId || storeId });
      if (user.avatarPath) setPreview(user.avatarPath);
    }
  }, [user, storeId, reset]);

  const handleUpload = (file: File | null) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setAvatarFile(file);
    }
  };

  const handleRemoveLogo = () => {
    setPreview(null);
    const fileInput = document.querySelector(
      'input[name="avatarPath"]'
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleRoleSelect = (selectedName: string) => {
    const role = roles.find((r) => r.name === selectedName);
    if (role) setValue("roleId", role.id);
  };

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Append image file
    if (avatarFile) {
      formData.append("avatarPath", avatarFile);
    }

    try {
      console.log("Form Data:", formData);
      console.log("Form Data Entries:", Array.from(formData.entries()));
      const response = await fetch(
        "http://localhost:8000/api/v1/employee/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log("User registration success:", result);

      toast.success("User added successfully!");

      await window.ipc.invoke("syncEmployees", storeId);
      reset();
      refreshPage();
      setPreview(null);
      setAvatarFile(null);
      triggerRef.current?.click();
    } catch (error) {
      console.error("User registration failed:", error);
      toast.error("Failed to register user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} className="text-customPrimary-500">
        {isEditMode ? "Edit User" : "Add User"} +
      </DialogTrigger>
      <DialogContent className="p-4 min-w-[65vw]">
        <DialogHeader>
          <DialogTitle className="text-customPrimary-500">
            {isEditMode ? "Edit User" : "Add New User"}
          </DialogTitle>
        </DialogHeader>
        <DialogClose />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isSubmitting}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("address")} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="roleId">Role</Label>
                <Select onValueChange={handleRoleSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.roleId && (
                  <p className="text-red-500 text-sm">
                    {errors.roleId.message}
                  </p>
                )}
              </div>

              <input type="hidden" value={storeId} {...register("storeId")} />

              {/* Avatar Upload */}
              <div className="flex flex-col gap-2">
                <Label>Employee Image</Label>
                {!preview ? (
                  <FileUploader
                    multiple={false}
                    types={["png", "jpg", "jpeg"]}
                    handleChange={handleUpload}
                    name="avatarPath"
                  >
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-customPrimary-200 p-8  rounded-xl transition cursor-pointer">
                      <Upload className="text-customPrimary-500 w-5 h-5 mb-2" />
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG or JPEG
                      </span>
                    </div>
                  </FileUploader>
                ) : (
                  <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <Image
                      src={preview}
                      alt="Avatar Preview"
                      className="w-28 h-28 object-cover rounded-full border"
                      width={112}
                      height={112}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveLogo}
                      className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="submit"
                className="bg-customPrimary-500 text-white rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    {isEditMode ? "Updating..." : "Adding..."}
                  </>
                ) : isEditMode ? (
                  "Update User"
                ) : (
                  "Add User"
                )}
              </Button>
            </div>{" "}
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
}
