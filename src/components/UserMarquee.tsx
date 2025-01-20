import Marquee from "react-fast-marquee";
import { getHolidays } from "@/db/UserDbQueries";
import { format } from "date-fns";

export default async function ReactMarquee() {
  const holidays = await getHolidays();

  if (holidays.length === 0) return "";
  return (
    <Marquee className="flex h-8 text-lg">
      {holidays.map((h) => {
        return (
          <div key={h.id} className="flex items-center justify-center gap-10">
            <div className="size-2 rounded-full bg-white" />
            <p>{format(h.holiday_date, "PPP")}</p>
            <div className="size-2 rounded-full bg-white" />
            <p className="mr-9"> {h.message} </p>
          </div>
        );
      })}
    </Marquee>
  );
}
