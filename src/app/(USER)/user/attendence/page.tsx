import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getSession } from "@/lib/utils";
import { getEmpIdById } from "@/db/UserDbQueries";
import { fetchAttendence } from "@/server/RealtimeAPI";
import { format, parse } from "date-fns";

const page = async () => {
  const session = await getSession();
  const userID = await getEmpIdById(session?.user.id as string);

  const attendence = await fetchAttendence({
    params: userID?.employee_id as string,
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

export default page;
