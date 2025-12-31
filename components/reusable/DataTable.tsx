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

type DataTableProps<TData, TValue> = {
  children?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: TData) => void;

  actionHeader?: string;
  renderAction?: (row: TData) => React.ReactNode;
};

export function DataTable<TData, TValue>({
  children,
  columns,
  data,
  page = 1,
  pageSize = 10,
  total = data.length,
  onPageChange,
  onRowClick,
  actionHeader = "Action",
  renderAction,
}: DataTableProps<TData, TValue>) {
  const finalColumns = renderAction
    ? ([
        ...columns,
        {
          id: "__action__",
          header: actionHeader,
          cell: ({ row }: any) => (
            <div className="flex justify-end">{renderAction(row.original)}</div>
          ),
        } as ColumnDef<TData, TValue>,
      ] as ColumnDef<TData, TValue>[])
    : columns;

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-md grid">
      {children && <div className="px-4 pt-4">{children}</div>}

      <div className="w-full overflow-x-auto">
        <Table className="w-full border-separate border-spacing-y-4">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-lg font-normal text-[#4A4C56] leading-150% bg-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const cells = row.getVisibleCells();
                return (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClick?.(row.original)}
                    className="bg-white transition cursor-pointer"
                  >
                    {cells.map((cell, index) => {
                      const isFirst = index === 0;
                      const isLast = index === cells.length - 1;

                      return (
                        <TableCell
                          key={cell.id}
                          className={`
                            p-4 text-[16px] text-[#333]
                            border-y border-[#E8E9E9]
                            ${isFirst ? "border-l rounded-l-xl" : ""}
                            ${isLast ? "border-r rounded-r-xl" : ""}
                          `}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={finalColumns.length}
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
