"use client";

import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
// import { empTypes } from "@/lib/utils";

export type PayrollColumnType = {
  id: string;
  basic_salary: number;
  gross_salary: number;
  net_salary: number;
  // HRA: number | null;
  // medical: number | null;
  // convenience: number | null;
  // other_allowences: number | null;
  // deducation: number | null;
  user: {
    name: string;
    id: string;
  };
};

export const PayrollColumn: ColumnDef<PayrollColumnType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const index = row.index;
      return <span>{index + 1}</span>;
    },
  },
  {
    accessorKey: "user",
    header: "User Name",
    cell: ({ row }) => {
      const { name } = row.original.user;
      return <span>{name}</span>;
    },
  },
  {
    accessorKey: "basic_salary",
    header: "Basic Salary",
    cell: ({ row }) => {
      const { basic_salary } = row.original;
      return <span>{formatCurrency(basic_salary)}</span>;
    },
  },

  {
    accessorKey: "gross_salary",
    header: "Gross Salary",
    cell: ({ row }) => {
      const { gross_salary } = row.original;
      return <span>{formatCurrency(gross_salary)}</span>;
    },
  },
  {
    accessorKey: "net_salary",
    header: "Net Salary",
    cell: ({ row }) => {
      const { net_salary } = row.original;
      return <span className="font-bold">{formatCurrency(net_salary)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const salary = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(salary.email)}
            >
              Copy Email
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/user/${salary.user.id}`}>View Employee</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
