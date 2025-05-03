import { Table } from "@/utils/Types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { customTransition, customVariants } from "@/lib/constant";
import { Button as HeroButton } from "@heroui/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, Edit } from "lucide-react";
import { Button } from "./ui/button";

export function MergeTable({
  tables,
  onMerge,
}: {
  tables: Table[];
  onMerge: (tableIds: string[]) => void;
}) {
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedTables((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  const handleConfirmMerge = () => {
    if (selectedTables.length === 2) {
      onMerge(selectedTables);
      setSelectedTables([]);
    }
  };

  return (
    <Dialog variants={customVariants} transition={customTransition}>
      <DialogTrigger className="text-customPrimary-500 hover:text-customPrimary-700 transition-transform transform hover:scale-110 m-4 border-2 border-customPrimary-400 p-3 rounded-lg  hover:shadow-lg">
        Merge Tables
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-customPrimary-500">
            Select Two Tables to Merge
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-5">
          <div className="grid grid-cols-4 gap-6">
            {tables
              .filter(
                (table) => table.status === "AVAILABLE" && !table.mergedIntoId
              )
              .map((table) => (
                <button
                  key={table.id}
                  onClick={() => handleSelect(table.id)}
                  disabled={!!table.mergedIntoId}
                  className={`p-4 border rounded-xl transition-transform transform hover:scale-105 text-lg font-medium ${
                    selectedTables.includes(table.id)
                      ? "bg-customPrimary-500 text-white shadow-lg"
                      : "bg-white text-gray-700 border-gray-300"
                  } ${
                    table.mergedIntoId ? "bg-gray-200 cursor-not-allowed" : ""
                  } hover:border-customPrimary-400`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm">{table.name}</span>
                    <span className="text-xs text-gray-600">
                      {table.chairs} chairs
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <DialogClose />
          <Button
            onClick={handleConfirmMerge}
            disabled={selectedTables.length !== 2}
            className={`rounded-md text-white transition-all ${
              selectedTables.length === 2
                ? "bg-customPrimary-500 hover:bg-customPrimary-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Merge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const EditTableInfo = ({
  table,
  onSave,
  onDelete,
}: {
  table: Table;
  onSave: (updatedTable: Table) => void;
  onDelete: (id: string) => void;
}) => {
  const [formData, setFormData] = useState({
    chairs: table.chairs,
    status: table.status,
    customerName: table.customerName || "",
    reservationName: table.reservationName || "",
    reservationTime: table.reservationTime || "",
    tableName: table.name || `Table ${table.id}`,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (isOpen && table.reservationTime) {
      const parsedDate = new Date(table.reservationTime);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      }
    }
  }, [isOpen, table.reservationTime]);

  useEffect(() => {
    if (isOpen) {
      setIsPopoverOpen(true);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({
      ...table,
      ...formData,
      reservationTime: date
        ? date.toISOString()
        : formData.reservationTime || "",
    });
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete ${formData.tableName}?`)
    ) {
      onDelete(table.id);
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      variants={customVariants}
      transition={customTransition}
    >
      <DialogTrigger className="text-customPrimary-500 hover:text-customPrimary-700 transition-transform transform hover:scale-110">
        <Edit className="w-6 h-6" />
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl text-customPrimary-500">
            Edit Table Information
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-5">
          <Label className="block text-sm font-medium text-gray-700">
            Chairs
          </Label>
          <Input
            type="number"
            name="chairs"
            value={formData.chairs}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          <Label className="block text-sm font-medium text-gray-700">
            Status
          </Label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="RESERVED">Reserved</option>
          </select>

          {formData.status === "OCCUPIED" && (
            <>
              <Label className="block text-sm font-medium text-gray-700">
                Customer Name
              </Label>
              <Input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </>
          )}

          {formData.status === "RESERVED" && (
            <>
              <Label className="block text-sm font-medium text-gray-700">
                Reservation Name
              </Label>
              <Input
                type="text"
                name="reservationName"
                value={formData.reservationName}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              <Label className="block text-sm font-medium text-gray-700">
                Reservation Time
              </Label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(selectedDate) => {
                      if (selectedDate) setDate(selectedDate);
                      setIsPopoverOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 space-x-4">
          <HeroButton
            radius="sm"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </HeroButton>
          <HeroButton
            radius="sm"
            onClick={handleSubmit}
            className="bg-customPrimary-500 text-white px-4 py-2 rounded-md hover:bg-customPrimary-700"
          >
            Save
          </HeroButton>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
