"use client";

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
import { empTypes } from "@/lib/utils";

export type EmployeeColumnType = {
  id: string;
  employee_id: string;
  name: string;
  email: string;
  primary_contact: string;
  designation: string;
  department: string;
  employement_type: string;
  userID: string;
  user: {
    name: string;
  };
};

export const EmployeeColumn: ColumnDef<EmployeeColumnType>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      const index = row.index + 1;
      return <span>{index}</span>;
    },
  },
  {
    accessorKey: "employee_id",
    header: "Employee ID",
  },
  {
    accessorKey: "user.name",
    header: "Username",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "primary_contact",
    header: "Primary Contact",
    cell: ({ row }) => {
      const { primary_contact } = row.original;
      return <span>+91-{primary_contact}</span>;
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "employement_type",
    header: "Employement Type",
    cell: ({ row }) => {
      const { employement_type } = row.original;
      return <span>{empTypes(employement_type)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/user/${user.userID}`}>View Employee</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
