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

import { useState } from "react";
import Pagination from "@/components/reusable/pagination";

// ----- FAKE DATA TYPE -----
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

// ----- FAKE DATA -----
const fakeUsers: User[] = Array.from({ length: 36 }).map((_, i) => ({
  id: i + 1,
  name: ["Sujon Ahmed", "Jamal Hossain", "Rifat Hasan", "Maruf Islam", "Mehedi Rahman", "Zihad Khan"][i % 6],
  email: [
    "sujon@example.com",
    "jamal@example.com",
    "rifat@example.com",
    "maruf@example.com",
    "mehedi@example.com",
    "zihad@example.com",
  ][i % 6],
  role: ["Admin", "Editor", "User", "Editor", "User", "User"][i % 6],
}));

// ----- TABLE COLUMNS -----
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize text-blue-500">{row.original.role}</span>
    ),
  },
];

export default function FakeDataTable() {
  // ----- Pagination State -----
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const startIndex = (page - 1) * pageSize;
  const pageData = fakeUsers.slice(startIndex, startIndex + pageSize);

  const table = useReactTable({
    data: pageData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-6 containers">
      <h2 className="text-xl font-semibold mb-4">User List (Fake Data)</h2>

    <div className="overflow-hidden rounded-lg border border-gray-200" key={page}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-gray-700 py-3">
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {!table.getRowModel().rows.length && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          page={page}
          pageSize={pageSize}
          total={fakeUsers.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
