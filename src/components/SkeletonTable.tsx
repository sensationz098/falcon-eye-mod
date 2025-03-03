import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";

export const SkeletonTable = () => {
  return (
    <Table className="mx-auto">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="hidden md:table-cell">Punch In</TableHead>
          <TableHead className="hidden md:table-cell">Punch Out</TableHead>
          <TableHead className="md:hidden">In-Out</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <TableRow key={i}>
            {[1, 2, 3, 4].map((c) => (
              <TableCell key={c}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
