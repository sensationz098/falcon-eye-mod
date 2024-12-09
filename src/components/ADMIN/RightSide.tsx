import { Calendar } from "../ui/calendar";

const RightSide = async () => {
  return (
    <section className="flex flex-col items-start justify-between">
      <div className="flex flex-col space-y-2 pb-4 pt-2">
        <h1 className="text-xl font-bold">Upcoming Events</h1>
        {[1, 2, 3].map((i) => {
          return (
            <span key={i} className="text-sm">
              23 december 2024 {i}
            </span>
          );
        })}
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
