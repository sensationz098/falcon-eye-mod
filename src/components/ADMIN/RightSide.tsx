import { upcomingBirthdays } from "@/db/AdminDbQueries";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "../ui/calendar";

const RightSide = async () => {
  const birthdays = await upcomingBirthdays();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <h1 className="text-center text-xl font-bold">Upcoming Birthdays</h1>
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
                className="mx-auto mb-2 grid grid-cols-[25px_1fr] items-start justify-center rounded-3xl border bg-slate-800 py-3 pl-3 last:mb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{i.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(i.date_of_birth!, "dd, MMMM")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <Calendar className="hidden md:block" />
      </div>
    </Card>
  );
};

export default RightSide;
