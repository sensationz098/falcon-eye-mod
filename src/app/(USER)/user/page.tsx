import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserHeader from "@/components/USER/UserHeader";
import { format } from "date-fns";

import WorkReportUpdate from "@/components/USER/WorkReportUpdate";
import { upcomingBirthdays } from "@/db/AdminDbQueries";
import { getEmpIdById, getHolidays } from "@/db/UserDbQueries";
import { getSession } from "@/lib/utils";
import { Cake, Calendar1Icon, Frown } from "lucide-react";

const page = async () => {
  const session = await getSession();
  const birthdays = await upcomingBirthdays();
  const isEmployeeAvailable = await getEmpIdById(session?.user.id as string);
  const holidays = await getHolidays();

  if (isEmployeeAvailable === null)
    return <h1>ask HR to create employee details</h1>;

  return (
    <div className="pb-10">
      <div className="my-7 flex flex-1 flex-col gap-4 px-8 md:px-20">
        <UserHeader _id={session?.user.id as string} />
        <WorkReportUpdate userID={session?.user.id as string} />
      </div>
      <div className="flex flex-1 flex-col gap-12 px-8 md:grid md:grid-cols-2 md:px-20">
        {/* <WorkReport userID={session?.user.id as string} /> */}

        <Card className="h-full">
          {/* <Calendar className="hidden w-full md:block" /> */}
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-bold">Upcoming Events</h1>
            </CardTitle>
            <CardDescription>
              <h2 className="text-center font-bold">
                Stay Updated on Upcoming Events!
              </h2>
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-1">
            <CardContent>
              <div className="py-4">
                {holidays.length === 0 ? (
                  <div className="flex items-center gap-2 text-sm font-medium leading-none">
                    <Frown />
                    Sorry, there is no event for this month. Better luck next
                    time!
                  </div>
                ) : (
                  holidays.map((i) => (
                    <div
                      key={i.id}
                      className="mx-auto mb-2 grid grid-cols-[25px_1fr] items-start justify-center rounded-3xl border bg-slate-800 py-3 pl-3 last:mb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i.title}
                        </p>

                        <div className="space-y-1 py-1">
                          <p className="font-sans text-sm leading-none text-gray-400">
                            {i.message}
                          </p>
                        </div>
                        <div className="flex items-center justify-start gap-2 py-1">
                          <Calendar1Icon size={15} />
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(i.holiday_date), "dd, MMMM")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </div>
          {/* </div> */}
        </Card>

        {/* <RightSide /> */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-bold">
                Upcoming Birthdays
              </h1>
            </CardTitle>
            <CardDescription>
              <h2 className="text-center font-bold">Wish you Happy Birthday</h2>
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CardContent className="grid gap-4">
              <div className="py-4">
                {birthdays.map((i) => (
                  <div
                    key={i.id}
                    className="mx-auto mb-2 grid grid-cols-[25px_1fr] items-start justify-center gap-5 rounded-3xl border bg-slate-800 py-3 pl-3 last:mb-0"
                  >
                    <Cake />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {i.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(i.date_of_birth!, "dd, MMMM")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <Calendar className="hidden w-full md:block" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default page;
