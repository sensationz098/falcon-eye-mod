import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, LucideIcon, Calendar, Mail } from "lucide-react";
import { getStatsCard } from "@/db/AdminDbQueries";

type StatsCardType = {
  title: string;
  icon: LucideIcon;
  value: number;
}[];

const StatsCard = async () => {
  const statsData = await getStatsCard();

  const stats: StatsCardType = [
    { title: "employee", icon: Home, value: statsData.totalEmployee },
    { title: "users", icon: Calendar, value: statsData.totalUsers },
    { title: "branchs", icon: Mail, value: statsData.totalBranches.length },
    { title: "present", icon: Home, value: 54 },
  ];

  return (
    <div className="flex flex-wrap items-center justify-around gap-4 p-2">
      {stats.map((i) => {
        return (
          <Card
            key={i.title}
            className="w-[250px] transition-all duration-500 hover:border hover:border-primary"
          >
            <CardHeader className="flex flex-row items-center justify-around">
              <CardTitle className="capitalize">{i.title}</CardTitle>
              <CardDescription>
                <i.icon />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-xl font-semibold">{i.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
