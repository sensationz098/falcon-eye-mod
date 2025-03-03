export const dynamic = "force-dynamic";

import { BarCharts, RightSide, StatsCard } from "@/components";
import { totalDepartmentChart } from "@/db/AdminDbQueries";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  const dep = await totalDepartmentChart();
  return (
    <div className="mx-8">
      <h1 className="text-3xl font-bold">Hello, {session?.user.name} </h1>
      <StatsCard />
      <div className="mb-40 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <BarCharts dep={dep} />
        <div className="">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default page;
