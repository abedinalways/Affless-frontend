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
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  children,
  columns,
  data,
  page = 1,
  pageSize = 10,
  total = data.length,
  onPageChange,
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

        <Table className=" border-separate border-spacing-y-4">

          {/* HEADER */}
          <TableHeader className="bg-white rounded-md border-2 border-red-500 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="p-9" >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="p text-sm font-semibold "
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="
                    bg-white 
                     border-2 border-red-500
                    rounded-xl 
                    hover:bg-red-100
                    transition
                  "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2.5 ">
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
