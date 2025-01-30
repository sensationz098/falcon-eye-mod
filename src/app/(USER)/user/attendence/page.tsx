import { parse, isSunday, format } from "date-fns";
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
import { fetchAttendence, InOutPunchData } from "@/server/RealtimeAPI";
import { CalculateSalary } from "@/lib/CalculateSalary";

const page = async () => {
  const Holiday = [
    {
      id: 1,
      title: "Christmas",
      message: "Christmas",
      holiday_date: "25/12/2024", // Ensure the correct format is used consistently
    },
    {
      id: 2,
      title: "Republic Day",
      message: "Republic Date",
      holiday_date: "26/01/2025", // Ensure the correct format is used consistently
    },
  ];

  const session = await getSession();
  const userID = await getEmpIdById(session?.user.id as string);
  const attendence = await fetchAttendence({
    params: userID?.employee_id as string,
  });

  // Check if the attendance data is available
  if (
    !attendence ||
    !attendence.InOutPunchData ||
    attendence.InOutPunchData.length === 0
  ) {
    // Handle the case where the data is missing
    return <div>No attendance data found</div>;
  }

  const data: InOutPunchData[] = attendence?.InOutPunchData;
  const payrol = CalculateSalary(data, Holiday);

  let TotalSunday = 0;
  const TotalHoliday = payrol.salary;
  const totalAbsent = payrol.absentCount;
  const totalPresent = payrol.present;

  // Calculate Total Sundays (WeekOffs)
  data.forEach((item) => {
    const parsedDate = parse(item.DateString, "dd/MM/yyyy", new Date());
    if (isSunday(parsedDate)) {
      TotalSunday += 1;
    }
  });

  const checkHoliday = (date: string) => {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    return Holiday.some(
      (holiday) =>
        parse(holiday.holiday_date, "dd/MM/yyyy", new Date()).getDate() ===
        parsedDate.getDate(),
    );
  };

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
              <span className="text-yellow-500">{TotalSunday}</span>
            </h2>
            <h2 className="text-xl font-normal text-white">
              Total Holiday: {TotalHoliday}
            </h2>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
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
            const parsedDate = parse(i.DateString, "dd/MM/yyyy", new Date());
            const dateString = format(parsedDate, "PP");

            const isHoliday = checkHoliday(i.DateString);
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
                  : "Absent";

            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{dateString}</TableCell>
                <TableCell>{i.INTime}</TableCell>
                <TableCell>{i.OUTTime}</TableCell>
                <TableCell>{i.WorkTime}</TableCell>
                <TableCell>{i.Late_In}</TableCell>
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
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
