import { getAllHoliday } from "@/db/UserDbQueries";
import { parse } from "date-fns";

export const checkHoliday = async (date: string) => {
  const Holiday = await getAllHoliday();
  const parsedDate = parse(date, "dd/MM/yyyy", new Date());
  return Holiday.some((holiday) => {
    const holidayDate =
      holiday.holiday_date instanceof Date
        ? holiday.holiday_date
        : parse(holiday.holiday_date, "yyyy/MM/dd", new Date());
    return holidayDate.getDate() === parsedDate.getDate();
  });
};
