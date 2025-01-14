import { BarCharts, PieCharts, RightSide, StatsCard } from "@/components";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello, {session?.user.name} </h1>
      <StatsCard />
      <div className="flex w-full flex-col justify-start md:flex-1 md:flex-row md:justify-between md:px-10">
        <div className="flex flex-1 flex-col gap-5 p-4 md:flex-row">
          <PieCharts />
          <BarCharts />
        </div>
        <div className="hidden pr-10 md:block">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default page;
