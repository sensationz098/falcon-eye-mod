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
  HRA: number | null;
  medical: number | null;
  convenience: number | null;
  other_allowences: number | null;
  deducation: number | null;
  employee: {
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
    accessorKey: "employee.name",
    // accessorFn: ({ employee }) => {
    //   const { name } = employee;
    //   return <span>{name}</span>;
    // },
    header: "Employee Name",
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
    accessorKey: "HRA",
    header: "HRA",
    cell: ({ row }) => {
      const { HRA } = row.original;
      return <span>{formatCurrency(HRA ? HRA : 0)}</span>;
    },
  },
  {
    accessorKey: "medical",
    header: "Medical",
    cell: ({ row }) => {
      const { medical } = row.original;
      return <span>{formatCurrency(medical ? medical : 0)}</span>;
    },
  },
  {
    accessorKey: "convenience",
    header: "Convenience",
    cell: ({ row }) => {
      const { convenience } = row.original;
      return <span>{formatCurrency(convenience ? convenience : 0)}</span>;
    },
  },
  {
    accessorKey: "other_allowences",
    header: "Other Allowences",
    cell: ({ row }) => {
      const { other_allowences } = row.original;
      return (
        <span>{formatCurrency(other_allowences ? other_allowences : 0)}</span>
      );
    },
  },
  {
    accessorKey: "deducation",
    header: "Deducation",
    cell: ({ row }) => {
      const { deducation } = row.original;
      return <span>{formatCurrency(deducation ? deducation : 0)}</span>;
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
              <Link href={`/admin/user/${salary.employee.id}`}>
                View Employee
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
