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
        <h1 className="text-center text-xl font-bold">Upcoming Events</h1>
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <h1>title </h1>
            <h1>12 january 2025</h1>
          </div>
        ))}
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
