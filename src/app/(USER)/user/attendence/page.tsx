import { parse, isSunday, format, startOfMonth, endOfMonth } from "date-fns";

import { getSession } from "@/lib/utils";
import { getAllHoliday, getEmpIdById, getSalary } from "@/db/UserDbQueries";
import { fetchAttendence, InOutPunchData } from "@/server/RealtimeAPI";
import { CalculateSalary } from "@/lib/CalculateSalary";
import MonthPicker from "@/components/monthpicker";
import AttendanceTable from "@/components/USER/AttendanceTable";

const page = async () => {
  const Holiday = await getAllHoliday();
  const session = await getSession();
  const userID = await getEmpIdById(session?.user.id as string);
  const attendence = await fetchAttendence({
    params: userID?.employee_id as string,
    start: format(startOfMonth(new Date()), "dd/MM/yyyy"),
    end: format(endOfMonth(new Date()), "dd/MM/yyyy"),
  });

  if (
    !attendence ||
    !attendence.InOutPunchData ||
    attendence.InOutPunchData.length === 0
  ) {
    return <div>No attendance data found</div>;
  }

  const data: InOutPunchData[] = attendence?.InOutPunchData;
  const salary = await getSalary({ _id: session?.user.id as string });

  // const currentMonth = parse(
  //   data[0].DateString,
  //   "dd/MM/yyyy",
  //   new Date(),
  // ).getMonth();

  // const HolidayDate = Holiday.filter((i) => {
  //   const parsedDate =
  //     i.holiday_date instanceof Date
  //       ? i.holiday_date
  //       : parse(i.holiday_date, "yyyy/MM/dd", new Date());
  //   return parsedDate.getMonth() === currentMonth;
  // }).map((i) => {
  //   const holidayDate =
  //     i.holiday_date instanceof Date
  //       ? i.holiday_date
  //       : parse(i.holiday_date, "yyyy/MM/dd", new Date());
  //   return holidayDate.getDate();
  // });
  const payrol = CalculateSalary(data, Holiday, salary?.basic_salary as number);

  let TotalSunday = 0;
  const TotalHoliday = payrol.TotalHoliday;
  const totalAbsent = payrol.absentCount;
  const totalPresent = payrol.present;
  const totalSalary = payrol.salary;

  // Calculate Total Sundays (WeekOffs)
  data.forEach((item) => {
    const parsedDate = parse(item.DateString, "dd/MM/yyyy", new Date());
    if (isSunday(parsedDate)) {
      TotalSunday += 1;
    }
  });

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
          <div>
            <h2 className="text-xl font-normal text-white">
              Total Salary:
              <span className="text-yellow-500">{totalSalary}</span>
            </h2>
            <h2 className="text-xl font-normal text-white">
              Select Month: <MonthPicker />
            </h2>
          </div>
        </div>
        <div className="md:px-20">
          <AttendanceTable attendence={data} />
        </div>
      </div>
    </div>
  );
};

export default page;
