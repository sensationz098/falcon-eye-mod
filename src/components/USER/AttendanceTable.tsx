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
  branch: string;
}

export default async function AttendanceTable({
  attendence,
  branch = "DELHI",
}: AttendanceTableProps) {
  console.log(branch);
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
          <TableHead>Date</TableHead>
          <TableHead colSpan={1} className="hidden md:table-cell">
            Punch In
          </TableHead>
          <TableHead colSpan={1} className="hidden md:table-cell">
            Punch Out
          </TableHead>
          <TableHead className="md:hidden">In-Out</TableHead>
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

            let status = "";

            if (i.Status === "P" && isWeekend) {
              status = "Weekend On";
            } else if (i.Status === "P" && isHoliday) {
              status = "Holiday On";
            } else {
              status =
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
            }

            // --- Punch In ---
            const [inHours, inMinutes] = i.INTime.split(":").map(Number);

            let LateInTime = "";
            if (inHours < 9 || (inHours === 9 && inMinutes <= 5)) {
              LateInTime = "ontime"; // Green
            } else if (inHours === 9 && inMinutes >= 6 && inMinutes <= 15) {
              LateInTime = "late"; // Yellow
            } else {
              LateInTime = "half"; // Red
            }

            // --- Punch Out ---
            const [outHours, outMinutes] = i.OUTTime.split(":").map(Number);

            let LateOutTime = "";
            if (
              (outHours === 18 && outMinutes >= 0 && branch === "DELHI") ||
              (outHours === 17 && outMinutes >= 0 && branch !== "DELHI")
            ) {
              LateOutTime = "ontime"; // Green
            } else if (outHours === 17 && outMinutes >= 0) {
              LateOutTime = "late"; // Yellow
            } else if (outHours < 17) {
              LateOutTime = "half"; // Red
            } else {
              LateOutTime = "half";
            }

            const getStatusColor = (status: string) => {
              switch (status) {
                case "Absent":
                  return "text-red-500";
                case "Present":
                  return "text-green-500";
                case "Holiday":
                  return "text-[#A855F7]"; // purple
                case "Week Off":
                  return "text-blue-500";
                case "Holiday On":
                case "Weekend On":
                  return "text-pink-500";
                default:
                  return "text-white";
              }
            };

            return (
              <TableRow key={index}>
                <TableCell>{dateString}</TableCell>
                <TableCell
                  className={`hidden font-bold md:table-cell ${
                    !i.INTime // if blank
                      ? getStatusColor(status)
                      : LateInTime === "ontime"
                        ? "text-green-500"
                        : LateInTime === "half"
                          ? "text-red-500"
                          : LateInTime === "late"
                            ? "text-yellow-500"
                            : "text-white"
                  }`}
                >
                  {i.INTime || "--"}
                </TableCell>

                <TableCell
                  className={`hidden font-bold md:table-cell ${
                    !i.OUTTime // if blank
                      ? getStatusColor(status)
                      : LateOutTime === "ontime"
                        ? "text-green-500"
                        : LateOutTime === "half"
                          ? "text-red-500"
                          : LateOutTime === "late"
                            ? "text-yellow-500"
                            : "text-white"
                  }`}
                >
                  {i.OUTTime || "--"}
                </TableCell>

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
                  className={`font-bold ${
                    status === "Present"
                      ? "text-green-500"
                      : status === "Absent"
                        ? "text-red-500"
                        : status === "Holiday"
                          ? "text-[#A855F7]"
                          : status === "Holiday On" || status === "Weekend On"
                            ? "text-pink-500"
                            : "text-blue-600"
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
