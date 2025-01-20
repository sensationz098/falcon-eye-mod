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
    { title: "Employee", icon: Home, value: statsData.totalEmployee },
    { title: "Users", icon: Calendar, value: statsData.totalUsers },
    { title: "Branchs", icon: Mail, value: statsData.totalBranches.length },
    { title: "Present", icon: Home, value: 54 },
  ];

  return (
    <div className="my-2 flex w-full items-center gap-2">
      {stats.map((i) => {
        return (
          <Card
            key={i.title}
            className="w-full transition-all duration-500 hover:border hover:border-primary"
          >
            {/* <CardHeader className="flex flex-row items-center justify-around">
              <CardTitle className="capitalize">{i.title}</CardTitle>
              <CardDescription>
                <i.icon />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-xl font-semibold">{i.value}</p>
            </CardContent> */}

            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="absolute mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40">
                {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6 text-white"
                        >
                            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                            <path
                            fillRule="evenodd"
                            d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                            clipRule  ="evenodd"
                            ></path>
                            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                        </svg> */}
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
