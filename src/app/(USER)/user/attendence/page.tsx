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

  let TotalSunday = 0;
  let TotalHoliday = 0;
  let totalAbsent = 0;
  let totalPresent = 0;

  if (attendence?.InOutPunchData) {
    // Single pass over the data
    attendence.InOutPunchData.forEach((i) => {
      switch (i.Status) {
        case "WO":
          TotalSunday++;
          break;
        case "HL":
          TotalHoliday++;
          break;
        case "A":
          totalAbsent++;
          break;
        case "P":
          totalPresent++;
          break;
        default:
          break;
      }
    });
  }

  return (
    <div>
      <div>
        <h1 className="w-full text-center text-5xl font-bold text-[#3576DF]">
          Attendance
        </h1>
        <div className="my-8 flex justify-evenly">
          <div>
            <h2 className="text-xl font-normal text-white">
              Total Present:{" "}
              <span className="text-green-500">{totalPresent}</span>
            </h2>
            <h2 className="text-xl font-normal text-white">
              Total Absent: <span className="text-red-500">{totalAbsent}</span>
            </h2>
          </div>
          <div>
            <h2 className="text-xl font-normal text-white">
              Total WeekOff:{" "}
              <span className="text-yellow-500"> {TotalSunday}</span>
            </h2>
            <h2 className="text-xl font-normal text-white">
              Total Holiday: {TotalHoliday}
            </h2>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="">
          <TableRow>
            <TableHead className="">No</TableHead>
            {/* <TableHead>Emp Code</TableHead> */}
            {/* <TableHead>Name</TableHead> */}
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
              <TableRow className="" key={index}>
                <TableCell>{index + 1}</TableCell>
                {/* <TableCell>{i.Empcode}</TableCell> */}
                {/* <TableCell>{i.Name}</TableCell> */}
                <TableCell>{dateString}</TableCell>
                <TableCell>{i.INTime}</TableCell>
                <TableCell>{i.OUTTime}</TableCell>
                <TableCell>{i.WorkTime}</TableCell>
                <TableCell>{i.Late_In}</TableCell>
                <TableCell
                  className={`font-bold text-red-800 ${i.Status === "A" ? "text-red-500" : i.Status === "P" ? "text-green-500" : "text-yellow-500"}`}
                >
                  {` ${i.Status === "A" ? "Absent" : i.Status === "P" ? "Present" : i.Status === "WO" ? "Week Off" : "Holiday"}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
