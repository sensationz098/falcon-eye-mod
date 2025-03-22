export const dynamic = "force-dynamic";
import { getAllHoliday, getEmpIdById, getSalary } from "@/db/UserDbQueries";
import { fetchAttendence, InOutPunchData } from "@/server/RealtimeAPI";
import { endOfMonth, format, isSunday, parse, startOfMonth } from "date-fns";
import { revalidatePath } from "next/cache";
import AttendanceWrapper from "@/components/USER/AttendanceWrapper";
import AttendanceTable from "@/components/USER/AttendanceTable";
import { CalculateSalary } from "@/lib/CalculateSalary";
import MonthPickerAdmin from "@/components/monthPickerAdmin";
// import dynamic from "next/dynamic";

export const revalidate = 3600;

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ month?: string }>;
}) => {
  const id = (await params).id;

  const empID = await getEmpIdById(id);
  if (!empID || !empID.employee_id) {
    return <div>No employee found</div>;
  }

  const { month } = await searchParams;
  const currentMonth = new Date();
  const selectedMonth = month ? parseInt(month) : currentMonth.getMonth();

  const selectedDate = new Date();
  selectedDate.setMonth(selectedMonth);

  const attendance = await FetchCalculateAttendance(
    selectedDate,
    empID?.employee_id as string,
    id,
  );

  // If this is intended for server-side, consider changing how it works or use API routes
  async function handleMonthChange(month: number) {
    "use server";
    const newDate = new Date();
    newDate.setMonth(month);

    revalidatePath(`/admin/attendence`);
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
          <div className="my-8 flex flex-col items-center justify-evenly gap-10">
            <div className="flex w-full flex-col items-center justify-around gap-5 md:flex-row">
              <h2 className="text-xl font-normal text-white">
                Total Present:{" "}
                <span className="text-green-500">{totalPresent}</span>
              </h2>
              <h2 className="text-xl font-normal text-white">
                Total Absent:{" "}
                <span className="text-red-500">{totalAbsent}</span>
              </h2>
              <h2 className="text-xl font-normal text-white">
                Total WeekOff:{" "}
                <span className="text-yellow-500">{TotalSunday}</span>
              </h2>
            </div>
            <div className="flex w-full flex-col items-center justify-around gap-5 md:flex-row">
              <h2 className="text-xl font-normal text-white">
                Total Holiday: {TotalHoliday}
              </h2>
              <h2 className="text-xl font-normal text-white">
                Total Salary:
                <span className="text-yellow-500">{totalSalary}</span>
              </h2>
              <h2 className="text-xl font-normal text-white">
                <MonthPickerAdmin emp={id} />
              </h2>
            </div>
          </div>
          <div className="md:px-20">
            <AttendanceTable attendence={data} />
          </div>
        </div>
      </AttendanceWrapper>
    </div>
  );
};

export async function FetchCalculateAttendance(
  month: Date,
  empID: string,
  id: string,
) {
  const Holiday = await getAllHoliday();

  const attendence = await fetchAttendence({
    params: empID,
    start: format(startOfMonth(month), "dd/MM/yyyy"),
    end: format(endOfMonth(month), "dd/MM/yyyy"),
  });

  if (
    !attendence ||
    !attendence.InOutPunchData ||
    attendence.InOutPunchData.length === 0
  ) {
    return <div>No attendance data found</div>;
  }

  const data: InOutPunchData[] = attendence?.InOutPunchData;
  const salary = await getSalary({ _id: id });

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

  return {
    data,
    TotalSunday,
    TotalHoliday,
    totalAbsent,
    totalPresent,
    totalSalary,
  };
}

export default Page;
