import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InOutPunchData } from "@/server/RealtimeAPI";
import { format, isSunday, parse } from "date-fns";
import { checkHoliday } from "@/utils/dateUtils";

interface AttendanceTableProps {
  attendence: InOutPunchData[];
}

export default async function AttendanceTable({
  attendence,
}: AttendanceTableProps) {
  const sortedAttendance = attendence.sort((a, b) => {
    const [dayA, monthA, yearA] = a.DateString.split("/").map(Number);
    const [dayB, monthB, yearB] = b.DateString.split("/").map(Number);

    const dateA = yearA * 10000 + monthA * 100 + dayA;
    const dateB = yearB * 10000 + monthB * 100 + dayB;

    return dateA - dateB;
  });

  return (
    <Table className="mx-auto">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead>No</TableHead> */}
          <TableHead>Date</TableHead>
          {/* <div className="flex"> */}
          <div className="hidden w-[300px] justify-center md:flex">
            <div className="px-6 py-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
              <TableHead className="">Punch In Code</TableHead>
            </div>
            <div className="px-6 py-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
              <TableHead className="">Punch Out Code</TableHead>
            </div>
          </div>
          {/* </div> */}
          <TableHead className="contain-inline-size md:hidden">
            In-Out
          </TableHead>

          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {await Promise.all(
          sortedAttendance.map(async (i, index) => {
            const parsedDate = parse(i.DateString, "dd/MM/yyyy", new Date());
            const dateString = format(parsedDate, "PP");
            // const pp = parse(dateString, "MM/dd/yyyy", new Date());

            const isHoliday = await checkHoliday(i.DateString);
            const isWeekend = isSunday(parsedDate);

            const status =
              i.Status === "P"
                ? isWeekend
                  ? "Week Off"
                  : isHoliday
                    ? "Holiday"
                    : "Present"
                : isWeekend
                  ? "Week Off"
                  : isHoliday
                    ? "Holiday"
                    : "Absent";

            const LateIn = i.INTime.split(":");
            const LateInHours = parseInt(LateIn[0]);
            const LateInMinutes = parseInt(LateIn[1]);

            let LateInTime = "";
            if (
              LateInHours > 8 &&
              LateInMinutes > 5 &&
              LateInHours > 8 &&
              LateInMinutes < 15
            ) {
              LateInTime = "Late In";
            } else if (LateInHours > 8 && LateInMinutes > 15) {
              LateInTime = "Half";
            } else if (LateInHours <= 9 && LateInMinutes <= 5) {
              LateInTime = "ontime";
            } else {
              LateInTime = "holiday";
            }

            const LateOut = i.OUTTime.split(":");
            const LateOutHours = parseInt(LateOut[0]);
            const LateOutMinutes = parseInt(LateOut[1]);

            let LateOutTime = "";
            if (
              (LateOutHours == 16 && LateOutMinutes > 30) ||
              (LateOutHours == 17 && LateOutMinutes <= 30)
            ) {
              LateOutTime = "Late Out";
            } else if (LateOutHours <= 16 && LateOutMinutes < 30) {
              LateOutTime = "Half";
            } else if (
              (LateOutHours === 17 && LateInMinutes >= 30) ||
              LateOutHours === 18
            ) {
              LateOutTime = "ontime";
            } else {
              LateOutTime = "holiday";
            }

            return (
              <TableRow key={index}>
                {/* <TableCell>{index + 1}</TableCell> */}
                <TableCell>{dateString}</TableCell>

                <div className="hidden w-[300px] justify-between gap-10 md:flex">
                  <div className="px-6 py-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                    <TableCell
                      className={`font-bold ${
                        LateInTime === "ontime"
                          ? "text-green-500"
                          : LateInTime === "Half"
                            ? "text-red-500"
                            : LateInTime === "Late In"
                              ? "text-yellow-500"
                              : LateInTime == "No"
                                ? "text-blue-500"
                                : "text-white"
                      }`}
                    >
                      {i.INTime}
                    </TableCell>
                  </div>
                  <div className="px-14 py-3 text-right align-bottom font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                    <TableCell
                      className={`font-bold ${
                        LateOutTime === "ontime"
                          ? "text-green-500"
                          : LateOutTime === "Half"
                            ? "text-red-500"
                            : LateOutTime === "Late Out"
                              ? "text-yellow-500"
                              : LateOutTime == "No"
                                ? "text-blue-500"
                                : "text-white"
                      }`}
                    >
                      {i.OUTTime}
                    </TableCell>
                  </div>
                </div>

                <TableCell className="md:hidden">
                  <span
                    className={`font-bold ${
                      LateInTime === "ontime"
                        ? "text-green-500"
                        : LateInTime === "Half"
                          ? "text-red-500"
                          : LateInTime === "Late In"
                            ? "text-yellow-500"
                            : LateInTime == "No"
                              ? "text-blue-500"
                              : "text-white"
                    }`}
                  >
                    {i.INTime}
                  </span>
                  {" - "}
                  <span
                    className={`font-bold ${
                      LateOutTime === "ontime"
                        ? "text-green-500"
                        : LateOutTime === "Half"
                          ? "text-red-500"
                          : LateOutTime === "Late Out"
                            ? "text-yellow-500"
                            : LateOutTime == "No"
                              ? "text-blue-500"
                              : "text-white"
                    }`}
                  >
                    {i.OUTTime}
                  </span>
                </TableCell>
                <TableCell
                  className={`font-bold text-red-800 ${
                    status === "Present"
                      ? "text-green-500"
                      : status === "Absent"
                        ? "text-red-500"
                        : status === "Holiday"
                          ? "text-yellow-500"
                          : "text-blue-500"
                  }`}
                >
                  {status}
                </TableCell>
              </TableRow>
            );
          }),
        )}
      </TableBody>
    </Table>
  );
}
