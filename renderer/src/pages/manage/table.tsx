import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import TableComponent from "@/components/Table-card";
import { Table } from "@/utils/Types";
import { MergeTable } from "@/components/Tablemerge-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEmployeeStore } from "@/stores/store";
import NotFound from "@/components/error/NotFound";

export default function Tableslist() {
  const [tables, setTables] = useState<Table[]>([]);
  const employee = useEmployeeStore((state) => state.employee);
  const storeId = employee?.storeId || "";

  // console.log("Store ID:", storeId);
  if (!storeId) {
    return <NotFound text="Store ID not found" />;
  }

  const normalizeStatus = (status: string): Table["status"] => {
    switch (status.toUpperCase()) {
      case "AVAILABLE":
      case "OCCUPIED":
      case "RESERVED":
      case "MERGED":
        return status.toUpperCase() as Table["status"];
      default:
        return "AVAILABLE";
    }
  };

  useEffect(() => {
    const loadTables = async () => {
      const cached = localStorage.getItem("tables");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTables(parsed);
            return;
          }
        } catch (err) {
          console.error("Failed to parse cached tables:", err);
        }
      }

      try {
        const response = await window.ipc.invoke("getTables", storeId);
        if (response.success) {
          const sanitizedTables = response.data.map((table: any) => ({
            ...table,
            status: normalizeStatus(table.status),
          }));
          setTables(sanitizedTables);
          localStorage.setItem("tables", JSON.stringify(sanitizedTables));
        } else {
          console.warn("Failed to fetch tables:", response.message);
        }
      } catch (error) {
        console.error("IPC error:", error);
      }
    };

    loadTables();
  }, []);

  const handleMergeTables = async (tableIds: string[]) => {
    if (tableIds.length !== 2) return;

    const [id1, id2] = tableIds;
    const parentTable = tables.find((t) => t.id === id1);
    const childTable = tables.find((t) => t.id === id2);

    if (!parentTable || !childTable) return;
    if (parentTable.status !== "AVAILABLE" || childTable.status !== "AVAILABLE")
      return;

    try {
      // API call to merge tables
      const response = await fetch(`/api/tables/merge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentId: parentTable.id,
          childId: childTable.id,
        }),
      });

      if (response.ok) {
        setTables((prevTables) =>
          prevTables.map((t) =>
            t.id === childTable.id ? { ...t, mergedIntoId: parentTable.id } : t
          )
        );
        localStorage.setItem("tables", JSON.stringify(tables));
      } else {
        console.error("Failed to merge tables");
      }
    } catch (error) {
      console.error("Failed to merge tables:", error);
    }
  };

  const handleUnmergeTable = async (table: Table) => {
    if (!table.mergedIntoId) return;

    try {
      // API call to unmerge the table
      const response = await fetch(`/api/tables/unmerge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableId: table.id,
        }),
      });

      if (response.ok) {
        setTables((prevTables) =>
          prevTables.map((t) =>
            t.id === table.id ? { ...t, mergedIntoId: undefined } : t
          )
        );
        localStorage.setItem("tables", JSON.stringify(tables));
      } else {
        console.error("Failed to unmerge table");
      }
    } catch (error) {
      console.error("Failed to unmerge table:", error);
    }
  };

  const handleDeleteTable = async (id: string) => {
    try {
      // API call to delete the table
      const response = await fetch(`/api/tables/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTables((prevTables) => prevTables.filter((t) => t.id !== id));
        localStorage.setItem("tables", JSON.stringify(tables));
      } else {
        console.error("Failed to delete table");
      }
    } catch (error) {
      console.error("Failed to delete table:", error);
    }
  };

  const handleEditTable = async (updatedTable: Table) => {
    try {
      // API call to update table info
      const response = await fetch(`/api/tables/${updatedTable.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedTable),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedTables = await response.json();
        setTables(updatedTables);
        localStorage.setItem("tables", JSON.stringify(updatedTables));
      } else {
        console.error("Failed to update table");
      }
    } catch (error) {
      console.error("Failed to update table:", error);
    }
  };

  const handleUpdateStatus = async (tableId: string, newStatus: string) => {
    try {
      // API call to update the table status in the database
      const response = await fetch(`/api/tables/${tableId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const updatedTable = await response.json();

        // Ensure that newStatus is a valid value (using TypeScript's union type).
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === updatedTable.id
              ? { ...table, status: updatedTable.status } // Use the actual updated status from response
              : table
          )
        );

        localStorage.setItem("tables", JSON.stringify(tables));
      } else {
        console.error("Failed to update table status");
      }
    } catch (error) {
      console.error("Failed to update table status:", error);
    }
  };

  return (
    <div className="container min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-customPrimary-500 flex items-center justify-center">
        <LayoutGrid className="mr-2" />
        Table List
      </h1>

      <div className="flex justify-end">
        <MergeTable tables={tables} onMerge={handleMergeTables} />
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-4 gap-6 p-5">
          {tables.map((table) => (
            <TableComponent
              key={table.id}
              table={table}
              onEdit={handleEditTable}
              onUpdateStatus={handleUpdateStatus}
              onDelete={() => handleDeleteTable(table.id)}
              merge={!!table.mergedIntoId}
              onUnmerge={handleUnmergeTable}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
