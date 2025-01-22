export const revalidate = 3600;

import { getEmpIdById } from "@/db/UserDbQueries";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAttendence } from "@/server/RealtimeAPI";
import { format, parse } from "date-fns";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const empID = await getEmpIdById(id);
  const attendence = await fetchAttendence({
    params: empID?.employee_id as string,
  });

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Emp Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Punch In Code</TableHead>
            <TableHead>Punch Out Code</TableHead>
            <TableHead>Work Time</TableHead>
            <TableHead>Late In</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendence?.InOutPunchData.map((i, index) => {
            const dateString = format(
              parse(i.DateString, "dd/MM/yyyy", new Date()),
              "PP",
            );
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{i.Empcode}</TableCell>
                <TableCell>{i.Name}</TableCell>
                <TableCell>{dateString}</TableCell>
                <TableCell>{i.INTime}</TableCell>
                <TableCell>{i.OUTTime}</TableCell>
                <TableCell>{i.WorkTime}</TableCell>
                <TableCell>{i.Late_In}</TableCell>
                <TableCell>{i.Status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
