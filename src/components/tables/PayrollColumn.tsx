"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
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
  };
};

export const PayrollColumn: ColumnDef<PayrollColumnType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "employee.name",
    accessorFn: ({ employee }) => {
      const { name } = employee;
      return <span>{name}</span>;
    },
    header: "Employee Name",
  },
  {
    accessorKey: "basic_salary",
    header: "Basic Salary",
  },
  {
    accessorKey: "HRA",
    header: "HRA",
  },
  {
    accessorKey: "medical",
    header: "Medical",
  },
  {
    accessorKey: "convenience",
    header: "Convenience",
  },
  {
    accessorKey: "other_allowences",
    header: "Other Allowences",
  },
  {
    accessorKey: "deducation",
    header: "Deducation",
  },
  {
    accessorKey: "gross_salary",
    header: "Gross Salary",
  },
  {
    accessorKey: "net_salary",
    header: "Net Salary",
  },
];
