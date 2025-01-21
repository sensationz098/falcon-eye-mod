export const revalidate = 3600;

import { format, parse } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAttendence, type InOutPunchData } from "@/server/RealtimeAPI";

const Page = async () => {
  const attendence = await fetchAttendence({ params: "ALL" });

  return (
    <div>
      <Table>
        <TableCaption>A list of Attendences</TableCaption>
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
          {attendence?.InOutPunchData?.map(
            (i: InOutPunchData, index: number) => {
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
            },
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
