"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Button } from "../ui/button";
import { UpdateLeaveRequest } from "@/server/action";
import type { ApprovalStatus } from "@prisma/client";

export type LeaveColumnType = {
  id: string;
  emp_name: string;
  start_date: Date;
  end_date: Date | null;
  leave_type: string;
  half_day: string;
  created_At: Date;
  reason: string;
  approval: ApprovalStatus;
};

export const LeaveColumns: ColumnDef<LeaveColumnType>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      const index = row.index + 1;
      return <span>{index}</span>;
    },
  },
  {
    accessorKey: "emp_name",
    header: "Name",
  },

  // {
  //   accessorKey: "employee",
  //   header: "Department",
  //   cell: ({ row }) => {
  //     const { department } = row.original.employee;
  //     return <span>{department}</span>;
  //   },
  // },

  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const { start_date } = row.original;
      return <span>{formatDate(start_date, "PPPP")}</span>;
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      const { end_date } = row.original;
      if (end_date) return <span>{formatDate(end_date, "PPPP")}</span>;
      return <span>not defined</span>;
    },
  },

  {
    accessorKey: "leave_type",
    header: "Leave Type",
  },
  {
    accessorKey: "half_day",
    header: "Half Day",
  },
  {
    accessorKey: "created_At",
    header: "Created At",
    cell: ({ row }) => {
      const date = formatDate(new Date(row.getValue("created_At")), "PP");
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "approval",
    header: "Status",
  },
  {
    id: "actions",
    header: "Request Preview",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant={"destructive"}
            onClick={() => UpdateLeaveRequest({ id, type: "REJECT" })}
          >
            Reject
          </Button>
          <Button onClick={() => UpdateLeaveRequest({ id, type: "ACCEPT" })}>
            Accept
          </Button>
        </div>
      );
    },
  },
];
