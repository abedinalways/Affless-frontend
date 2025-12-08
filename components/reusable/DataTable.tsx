"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Pagination from "./pagination";

interface DataTableProps<TData, TValue> {
  children?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[]; // Define the columns type
  data: TData[]; // Table data
  page?: number; // Current page
  pageSize?: number; // Items per page
  total?: number; // Total data count
  onPageChange?: (page: number) => void; // Page change handler

  onRowClick?: (row: TData) => void; // Row click handler
}

export function DataTable<TData, TValue>({
  children,
  columns,
  data,
  page = 1,
  pageSize = 10,
  total = data.length,
  onPageChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md">

      {children && <div className="px-4 pt-4">{children}</div>}

      <div className="overflow-x-auto">

        <Table className="border-separate border-spacing-y-4  w-full">

          {/* HEADER */}
          <TableHeader className="bg-white rounded-full  ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="p-9">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-sm font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* BODY */}
          <TableBody  className="">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}   
                  className="cursor-pointer bg-white  rounded-lg hover:bg-red-100 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2.5 text-lg ">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>

      {/* Pagination */}
      {onPageChange && (
        <div className="py-4">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={onPageChange}
          />
        </div>
      )}

    </div>
  );
}
