export const dynamic = "force-dynamic";

import { RightSide, StatsCard } from "@/components";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  return (
    <div className="mx-8">
      <h1 className="text-3xl font-bold">Hello, {session?.user.name} </h1>
      <StatsCard />
      <div className="flex gap-4">
        {/* <div className="flex flex-1 gap-2">
          <PieCharts /> 
          <BarCharts />
        </div> */}
        <div className="">
          <RightSide />
        </div>
        {/* <div className="hidden pr-10 md:block"></div> */}
      </div>
    </div>
  );
};

export default page;
