// import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
// import { upcomingBirthdays } from "@/db/dbQuery";

// type UpcomingBirthdaysType = {
//   name: string;
//   date_of_birth: string | Date;
// };

const RightSide = async () => {
  // const query = await upcomingBirthdays();

  // console.log(query);
  return (
    <section className="flex flex-col items-start justify-between">
      <div className="flex flex-col space-y-2 pb-4 pt-2">
        <h1 className="text-xl font-bold">Upcoming Events</h1>
        {/* /  {query?.birthdays?.map(
          ({ name, date_of_birth }: UpcomingBirthdaysType) => {
            return (
              <span key={date_of_birth as string} className="text-sm">
                {format(date_of_birth as string, "PPP")} {name}
              </span>
            );
          },
        )} */}
      </div>

      <div>
        <Calendar
          mode="single"
          selected={new Date()}
          ISOWeek
          className="rounded-md border"
        />
      </div>
    </section>
  );
};

export default RightSide;
