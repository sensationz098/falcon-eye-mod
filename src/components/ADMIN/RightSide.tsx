// import { format } from "date-fns";
// import { Calendar } from "../ui/calendar";
// import { upcomingBirthdays } from "@/db/dbQuery";

import { upcomingBirthdays } from "@/db/AdminDbQueries";
import { format } from "date-fns";

// type UpcomingBirthdaysType = {
//   name: string;
//   date_of_birth: string | Date;
// };

const RightSide = async () => {
  const birthdays = await upcomingBirthdays();

  const filteredByMonth = birthdays.filter((i) => {
    const birthMonth = new Date(i.date_of_birth).getMonth() + 1;
    const birthDay = new Date(i.date_of_birth).getMonth() + 1;

    return birthMonth === birthDay;
  });

  console.log(birthdays);
  console.log(filteredByMonth);

  return (
    <section className="flex flex-col items-start justify-between">
      <div className="flex flex-col space-y-2 pb-4 pt-2">
        <h1 className="text-center text-xl font-bold">Upcoming Events</h1>
        {filteredByMonth.map((i) => (
          <div key={i.id}>
            <h1>{i.name}</h1>
            <h1>{format(i.date_of_birth, "P")}</h1>
          </div>
        ))}
      </div>

      <div>
        {/* <Calendar
          mode="single"
          selected={new Date()}
          ISOWeek
          className="rounded-md border"
        /> */}
      </div>
    </section>
  );
};

export default RightSide;
