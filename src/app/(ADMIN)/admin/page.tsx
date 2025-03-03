export const dynamic = "force-dynamic";

import { BarCharts, PieCharts, RightSide, StatsCard } from "@/components";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  return (
    <div className="mx-8">
      <h1 className="text-3xl font-bold">Hello, {session?.user.name} </h1>
      <StatsCard />
      <div className="grid w-full grid-cols-3 gap-4">
        <div className="flex flex-1 gap-2">
          <PieCharts />
        </div>
        <BarCharts />
        <div className="">
          <RightSide />
        </div>
        {/* <div className="hidden pr-10 md:block"></div> */}
      </div>
    </div>
  );
};

export default page;
