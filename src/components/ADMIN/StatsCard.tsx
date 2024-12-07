// import prisma from "@/db/prisma";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StatsCard = async () => {
  //   const totalUsers = await prisma.user.count();
  //   const totalEmployees = await prisma.employee.count();
  //   const totalBranches = await prisma.employee.groupBy({
  //     by: ["branch"],
  //     _count: true,

  //   });
  //   const totalPayroll = 1241;

  return (
    <div className="flex flex-wrap items-center justify-around gap-4 p-2">
      {[1, 2, 3, 4].map((i) => {
        return (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Card Title {i}</CardTitle>
              <CardDescription>total number</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
