"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import TableComponent from "@/components/Table-card";
import { Table } from "@/utils/Types";
import { tableDataset } from "@/lib/data";
import { MergeTable } from "@/components/Tablemerge-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Tables() {
  const [tables, setTables] = useState<Table[]>(tableDataset);

  const handleMergeTables = (tableIds: number[]) => {
    const selectedTables = tables.filter((table) =>
      tableIds.includes(table.id)
    );

    if (selectedTables.length !== 2) return;

    const [table1, table2] = selectedTables;

    if (table1.merged || table2.merged) return;

    if (table1.status !== "available" || table2.status !== "available") return;

    const mergedTable: Table = {
      id: Math.max(table1.id, table2.id) + 1,
      name: `${table1.name} & ${table2.name}`,
      chairs: table1.chairs + table2.chairs,
      status: "available",
      mergedFrom: [table1.id, table2.id],
      merged: true,
    };

    setTables((prevTables) => [
      ...prevTables.filter((t) => !tableIds.includes(t.id)),
      mergedTable,
    ]);
  };

  const handleUnmergeTable = (mergedTable: Table) => {
    if (!mergedTable.mergedFrom) return;

    const restoredTables = mergedTable.mergedFrom
      .map((id) => tableDataset.find((t) => t.id === id))
      .filter(Boolean) as Table[];

    setTables((prevTables) => [
      ...prevTables.filter((t) => t.id !== mergedTable.id),
      ...restoredTables,
    ]);
  };

  const handleDeleteTable = (id: number) => {
    setTables((prevTables) => prevTables.filter((t) => t.id !== id));
  };

  const handleEditTable = (updatedTable: Table) => {
    setTables((prevTables) =>
      prevTables.map((t) => (t.id === updatedTable.id ? updatedTable : t))
    );
  };

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setTables((prevTables: any) =>
      prevTables.map((table: any) =>
        table.id === id ? { ...table, status: newStatus } : table
      )
    );
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
        <div className="grid grid-cols-4  gap-6  p-5">
          {tables.map((table) => (
            <TableComponent
              key={table.id}
              table={table}
              onEdit={handleEditTable}
              onUpdateStatus={handleUpdateStatus}
              onDelete={() => handleDeleteTable(table.id)}
              merge={table.merged ?? false}
              onUnmerge={handleUnmergeTable}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
