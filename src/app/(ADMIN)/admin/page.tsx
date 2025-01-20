import { BarCharts, PieCharts, RightSide, StatsCard } from "@/components";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  return (
    <div>
      <h1 className="mb-6 ml-8 mt-10 text-3xl font-bold">
        Hello, <span className="text-blue-500">{session?.user.name} </span>
      </h1>
      <StatsCard />
      <div className="flex w-full flex-col items-center justify-start md:flex-1 md:flex-row md:justify-evenly md:px-10">
        <div className="my-9 flex flex-1 flex-col gap-10 md:flex-row">
          <PieCharts />
          <BarCharts />
          <RightSide />
        </div>
        {/* <div className="hidden pr-10 md:block"></div> */}
      </div>
    </div>
  );
};

export default page;
