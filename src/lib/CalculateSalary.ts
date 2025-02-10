import {
  parse,
  differenceInDays,
  isSaturday,
  format,
  addDays,
  isMonday,
  isSunday,
} from "date-fns";
import LateDeduction from "./LateDeduction";

export type DownloadInOutPunchDataType = {
  Empcode: string;
  INTime: string;
  OUTTime: string;
  WorkTime: string;
  OverTime: string;
  BreakTime: string;
  Status: "A" | "P";
  DateString: string;
  Remark: string;
  Erl_Out: string;
  Late_In: string;
  Name: string;
};

interface allowedHolidaysType {
  id: number;
  holiday_date: Date | string;
  title?: string;
  message?: string;
}

export function CalculateSalary(
  data: DownloadInOutPunchDataType[],
  Holiday: allowedHolidaysType[],
  salary: number,
) {
  const currentMonth = parse(
    data[0].DateString,
    "dd/MM/yyyy",
    new Date(),
  ).getMonth();

  const HolidayDate = Holiday.filter((i) => {
    const parsedDate =
      i.holiday_date instanceof Date
        ? i.holiday_date
        : parse(i.holiday_date, "yyyy/MM/dd", new Date());
    return parsedDate.getMonth() === currentMonth;
  }).map((i) => {
    const holidayDate =
      i.holiday_date instanceof Date
        ? i.holiday_date
        : parse(i.holiday_date, "yyyy/MM/dd", new Date());
    return holidayDate.getDate();
  });

  const absent = data.filter((i) => i.Status === "A");
  const present = data.filter((i) => i.Status === "P");

  let TotalAbsentCount = 0;
  absent.forEach((i) => {
    if (!isSunday(parse(i.DateString, "dd/MM/yyyy", new Date()))) {
      TotalAbsentCount++;
    }
  });
  let absentCount = 0;
  let sundayCount = 0;
  present.forEach((i) => {
    const date = parse(i.DateString, "dd/MM/yyyy", new Date());

    if (isSunday(date) || HolidayDate.some((it) => date.getDate() === it)) {
      sundayCount++;
    }
  });

  absent.forEach((i) => {
    const date = parse(i.DateString, "dd/MM/yyyy", new Date());
    if (
      isMonday(date) ||
      isSaturday(date) ||
      HolidayDate.some((it) => {
        return it - 1 === date.getDate() || it + 1 === date.getDate();
      })
    ) {
      absentCount++;
    }

    if (
      isSunday(date) ||
      HolidayDate.some((it) => {
        return it === date.getDate();
      })
    ) {
      absentCount--;
    }
    absentCount += 1;
  });

  absent.forEach((i) => {
    const first = parse(i.DateString, "dd/MM/yyyy", new Date());

    if (isMonday(first)) {
      const prv = format(addDays(first, -1), "dd/MM/yyyy");
      const ma = absent.some((it) => it.DateString === prv);
      if (!ma) {
        absentCount--;
      }
    } else if (isSaturday(first)) {
      const nd = format(addDays(first, 1), "dd/MM/yyyy");
      const sa = absent.some((it) => it.DateString === nd);
      if (!sa) {
        absentCount--;
      }
    } else if (HolidayDate.some((id) => first.getDate() === id - 1)) {
      const nd = first.getDate();

      const sa = absent.some((p) => {
        const absentDate = parse(p.DateString, "dd/MM/yyyy", new Date());
        return absentDate.getDate() === nd + 1;
      });

      if (!sa) {
        absentCount--;
      }
    } else if (HolidayDate.some((id) => first.getDate() === id + 1)) {
      const nd = first.getDate();
      const sa = absent.some((p) => {
        const absentDate = parse(p.DateString, "dd/MM/yyyy", new Date());
        return absentDate.getDate() === nd - 1;
      });

      if (!sa) {
        absentCount--;
      }
    }
  });
  for (let i = 0; i < absent.length - 2; i++) {
    const first = parse(absent[i].DateString, "dd/MM/yyyy", new Date());
    const second = parse(absent[i + 2].DateString, "dd/MM/yyyy", new Date());

    if (
      (differenceInDays(second, first) === 2 &&
        isSaturday(first) &&
        isMonday(second)) ||
      (differenceInDays(second, first) === 2 &&
        HolidayDate.some((it) => {
          return it - 1 === first.getDate() && it + 1 === second.getDate();
        }))
    ) {
      absentCount = absentCount - 1;
    }
  }
  const h = LateDeduction(data);
  const perday = salary / 30;
  absentCount = absentCount + h / 2;
  const deduct = perday * absentCount;
  const sundayWithSalary = perday * sundayCount;
  const TotalSalary = salary - deduct + sundayWithSalary;
  return {
    salary: Math.ceil(TotalSalary),
    present: present.length,
    absent: absentCount,
    absentCount: TotalAbsentCount,
    TotalHoliday: HolidayDate.length,
  };
}
