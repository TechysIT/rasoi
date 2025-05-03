import { useState } from "react";
import { Users, Calendar as LucidCalenderIcon, User } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table } from "@/utils/Types";
import { EditTableInfo } from "./Tablemerge-dialog";

interface TableComponentProps {
  table: Table;
  onEdit: (updatedTable: Table) => void;
  onUpdateStatus: (id: string, status: Table["status"]) => void;
  onDelete: (tableId: string) => void;
  merge: boolean;
  onUnmerge: (mergedTable: Table) => void;
}

export default function TableComponent({
  table,
  onEdit,
  onUpdateStatus,
  onDelete,
  merge,
  onUnmerge,
}: TableComponentProps) {
  const [updatedTable, setUpdatedTable] = useState<Table>(table);

  const statusColors = {
    AVAILABLE: "bg-green-100 text-green-700 border-green-500",
    OCCUPIED: "bg-red-100 text-red-700 border-red-500",
    RESERVED: "bg-yellow-100 text-yellow-700 border-yellow-500",
    MERGED: "bg-gray-100 text-gray-700 border-gray-500",
  };

  const handleSave = (updatedTable: Table) => {
    setUpdatedTable(updatedTable);
    onEdit(updatedTable);
  };

  // Handle status change
  const handleStatusChange = async (status: Table["status"]) => {
    setUpdatedTable((prev) => ({ ...prev, status }));
    try {
      // Make the API call to update the table status in the database
      await onUpdateStatus(updatedTable.id, status); // Pass the string id and status
    } catch (error) {
      console.error("Failed to update table status:", error);
    }
  };

  // const tableName =
  //   updatedTable.merged && updatedTable.mergedFrom?.length
  //     ? updatedTable.mergedFrom.map((id) => `Table ${id}`).join(" & ")
  //     : `Table ${updatedTable.id}`;

  const handleDelete = async () => {
    try {
      // Perform the DB delete action
      await onDelete(updatedTable.id); // Pass the string id for delete
      console.log("Table deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the table", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl border border-customPrimary-100 flex flex-col h-full">
      <div className="p-5 relative flex-grow">
        <div className="flex justify-between items-center mb-3">
          {/* <h2 className="text-lg font-semibold text-gray-900">{tableName}</h2> */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              statusColors[updatedTable.status]
            }`}
          >
            {updatedTable.status.charAt(0).toUpperCase() +
              updatedTable.status.slice(1).toLowerCase()}
          </span>
        </div>

        <div className="flex items-center text-gray-600 space-x-2 mb-2">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="text-sm">{updatedTable.chairs} chairs</span>
        </div>

        {updatedTable.status === "OCCUPIED" && updatedTable.customerName && (
          <div className="flex items-center text-gray-600 space-x-2 mb-2">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium">
              Occupied by: {updatedTable.customerName}
            </span>
          </div>
        )}

        {updatedTable.status === "RESERVED" && updatedTable.reservationName && (
          <div className="flex flex-col text-gray-600 mb-2">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium">
                Reserved by: {updatedTable.reservationName}
              </span>
            </div>
            {updatedTable.reservationTime && (
              <div className="flex items-center space-x-2 mt-1">
                <LucidCalenderIcon className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">
                  Time: {updatedTable.reservationTime}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-customPrimary-50/50 border-t border-customPrimary-100 px-5 py-3 flex justify-between items-center w-full">
        <Select value={updatedTable.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[120px] border-customPrimary-200">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AVAILABLE">Available</SelectItem>
            <SelectItem value="OCCUPIED">Occupied</SelectItem>
            <SelectItem value="RESERVED">Reserved</SelectItem>
          </SelectContent>
        </Select>

        {merge && (
          <Button
            className="bg-red-500 text-white border border-customPrimary-500 hover:bg-transparent hover:text-red-600 rounded-full text-xs"
            onClick={() => onUnmerge(updatedTable)}
          >
            Unmerge
          </Button>
        )}

        <EditTableInfo
          table={updatedTable}
          onSave={handleSave}
          onDelete={handleDelete} // Pass the handleDelete to the EditTableInfo component
        />
      </div>
    </div>
  );
}
