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
    <section className="mb-16 flex flex-col items-start justify-between rounded-xl border bg-gray-800 px-10 pb-6 pr-5">
      <div className="flex w-full flex-col items-center space-y-2 pt-4">
        <h1 className="text-center text-xl font-bold text-blue-500">
          Upcoming Events
        </h1>
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
