import { Card } from "@/components/ui/card";
import { Home, LucideIcon, Calendar, Mail } from "lucide-react";
import { getStatsCard } from "@/db/AdminDbQueries";
import { fetchPresent } from "@/server/RealtimeAPI";

type StatsCardType = {
  title: string;
  icon: LucideIcon;
  value: number;
}[];

const StatsCard = async () => {
  const statsData = await getStatsCard();
  const presents = await fetchPresent();

  const stats: StatsCardType = [
    { title: "Employee", icon: Home, value: statsData.totalEmployee },
    { title: "Users", icon: Calendar, value: statsData.totalUsers },
    { title: "Branches", icon: Mail, value: statsData.totalBranches.length },
    { title: "Present", icon: Home, value: presents.present || 0 },
  ];

  return (
    <div className="my-2 flex w-full items-center gap-2">
      {stats.map((i) => {
        return (
          <Card
            key={i.title}
            className="w-full transition-all duration-500 hover:border hover:border-primary"
          >
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="absolute mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40">
                <i.icon />
              </div>
              <div className="p-4 text-right">
                <p className="text-blue-gray-600 block font-sans text-xl font-semibold leading-normal antialiased">
                  {i.title}
                </p>
                <h4 className="text-blue-gray-900 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
                  {i.value}
                </h4>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
