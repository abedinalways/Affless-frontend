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
  onRowClick?: (row: TData) => void;
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
    <div className="w-full rounded-md grid">
      {children && <div className="px-4 pt-4">{children}</div>}

      <div className="w-full overflow-x-auto">

        <Table className="w-full border-separate border-spacing-y-4">
          {/* HEADER */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-lg font-normal text-[#4A4C56] leading-150% bg-white"
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
              table.getRowModel().rows.map((row) => {
                const cells = row.getVisibleCells(); // easier access

                return (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClick?.(row.original)}
                    className="bg-white  transition cursor-pointer"
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

      {/* PAGINATION */}
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

// "use client";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import Pagination from "./pagination";

// interface DataTableProps<TData, TValue> {
//   children?: React.ReactNode;
//   columns: ColumnDef<TData, TValue>[]; // Define the columns type
//   data: TData[]; // Table data
//   page?: number; // Current page
//   pageSize?: number; // Items per page
//   total?: number; // Total data count
//   onPageChange?: (page: number) => void; // Page change handler

//   onRowClick?: (row: TData) => void; // Row click handler
// }

// export function DataTable<TData, TValue>({
//   children,
//   columns,
//   data,
//   page = 1,
//   pageSize = 10,
//   total = data.length,
//   onPageChange,
//   onRowClick,
// }: DataTableProps<TData, TValue>) {

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="rounded-md">

//       {children && <div className="px-4 pt-4">{children}</div>}

//       <div className="overflow-x-auto">


// {/* border-separate border-spacing-y-4 */}
//         <Table className="w-full border-separate border-spacing-y-3">
//   <TableHeader className="bg-white rounded-full">
//     {table.getHeaderGroups().map((headerGroup) => (
//       <TableRow key={headerGroup.id} className="">
//         {headerGroup.headers.map((header) => (
//           <TableHead key={header.id} className="text-sm font-semibold ">
//             {flexRender(header.column.columnDef.header, header.getContext())}
//           </TableHead>
//         ))}
//       </TableRow>
//     ))}
//   </TableHeader>

//   <TableBody>
//     {table.getRowModel().rows.length ? (
//       table.getRowModel().rows.map((row) => (
//         <TableRow
//           key={row.id}
//           className="
//             bg-white 
//             border border-black 
//             rounded-xl 
//             hover:shadow-md 
//             transition
//           "
//         >
//           {row.getVisibleCells().map((cell, index) => (
//             <TableCell
//               key={cell.id}
//               className={`
//                 p-4
//                 ${index === 0 ? "rounded-l-xl" : ""}
//                 ${index === row.getVisibleCells().length - 1 ? "rounded-r-xl" : ""}
//               `}
//             >
//               {flexRender(cell.column.columnDef.cell, cell.getContext())}
//             </TableCell>
//           ))}
//         </TableRow>
//       ))
//     ) : (
//       <TableRow>
//         <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
//           No results found.
//         </TableCell>
//       </TableRow>
//     )}
//   </TableBody>
// </Table>

//       </div>

//       {/* Pagination */}
//       {onPageChange && (
//         <div className="py-4">
//           <Pagination
//             page={page}
//             pageSize={pageSize}
//             total={total}
//             onPageChange={onPageChange}
//           />
//         </div>
//       )}

//     </div>
//   );
// }


