import { parse, isSunday, format, startOfMonth, endOfMonth } from "date-fns";
import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/utils";
import { getAllHoliday, getEmpIdById, getSalary } from "@/db/UserDbQueries";
import { fetchAttendence, InOutPunchData } from "@/server/RealtimeAPI";
import { CalculateSalary } from "@/lib/CalculateSalary";
import MonthPicker from "@/components/monthpicker";
import AttendanceTable from "@/components/USER/AttendanceTable";
import AttendanceWrapper from "@/components/USER/AttendanceWrapper";

const page = async ({ searchParams }: { searchParams: { month?: string } }) => {
  const { month } = await searchParams;
  const currentMonth = new Date();
  const selectedMonth = month ? parseInt(month) : currentMonth.getMonth();

  const selectedDate = new Date();
  selectedDate.setMonth(selectedMonth);

  const attendance = await FetchCalculateAttendance(selectedDate);

  async function handleMonthChange(month: number) {
    "use server";
    const newDate = new Date();
    newDate.setMonth(month);
    revalidatePath("/user/attendence");
  }

  if (!attendance || "type" in attendance) {
    return <div>No attendance data found</div>;
  }

  const {
    data,
    TotalSunday,
    TotalHoliday,
    totalAbsent,
    totalPresent,
    totalSalary,
    branch,
  } = attendance;

  return (
    <div>
      <AttendanceWrapper
        currentMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      >
        <div>
          <h1 className="mt-14 w-full text-center text-5xl font-bold text-[#3576DF]">
            Attendance
          </h1>
          <div className="my-8 flex flex-col items-center justify-evenly gap-10 md:flex-row">
            <div className="flex w-full items-center justify-around">
              <h2 className="text-xl font-normal text-white">
                Total Present:{" "}
                <span className="text-green-500">{totalPresent}</span>
              </h2>
              <h2 className="text-xl font-normal text-white">
                Total Absent:{" "}
                <span className="text-red-500">{totalAbsent}</span>
              </h2>
            </div>
            <div className="flex w-full items-center justify-around">
              <h2 className="text-xl font-normal text-white">
                Total WeekOff:{" "}
                <span className="text-yellow-500">{TotalSunday}</span>
              </h2>
              <h2 className="text-xl font-normal text-white">
                Total Holiday: {TotalHoliday}
              </h2>
            </div>
            <div className="flex w-full items-center justify-around">
              <h2 className="text-xl font-normal text-white">
                Total Salary:
                <span className="text-yellow-500">{totalSalary}</span>
              </h2>
              <h2 className="text-xl font-normal text-white">
                <MonthPicker />
              </h2>
            </div>
          </div>
          <div className="md:px-20">
            <AttendanceTable attendence={data} branch={branch!} />
          </div>
        </div>
      </AttendanceWrapper>
    </div>
  );
};

export async function FetchCalculateAttendance(month: Date) {
  const Holiday = await getAllHoliday();
  const session = await getSession();
  const userID = await getEmpIdById(session?.user.id as string);

  const attendence = await fetchAttendence({
    params: userID?.employee_id as string,
    start: format(startOfMonth(month), "dd/MM/yyyy"),
    end: format(endOfMonth(month), "dd/MM/yyyy"),
  });
  const branch = userID?.branch;
  console.log("MEAR", branch, " and ", getAllHoliday);
  if (
    !attendence ||
    !attendence.InOutPunchData ||
    attendence.InOutPunchData.length === 0
  ) {
    return <div>No attendance data found</div>;
  }

  const data: InOutPunchData[] = attendence?.InOutPunchData;
  const salary = await getSalary({ _id: session?.user.id as string });

  const payrol = CalculateSalary(
    data,
    Holiday,
    salary?.basic_salary as number,
    userID?.branch as string,
  );

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

  return {
    data,
    TotalSunday,
    TotalHoliday,
    totalAbsent,
    totalPresent,
    totalSalary,
    branch,
  };
}

export default page;
