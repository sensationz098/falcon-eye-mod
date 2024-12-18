import prisma from "@/db/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "date-fns";
// import { Button } from "../ui/button";

const WorkReport = async ({ _id }: { _id: string }) => {
  const work_report = await prisma.workReport.findMany({
    where: {
      userID: _id,
    },
    orderBy: {
      updated_At: "desc",
    },
    take: 3,
  });

  return (
    <div className="w-10/12 p-2 md:w-5/12">
      <h1 className="text-center">Work Report Update</h1>

      <div className="my-3 h-0.5 w-full bg-primary" />
      <div className="flex flex-col gap-5">
        {work_report.map((i) => {
          return (
            <Card key={i.id}>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">
                  {formatDate(i.updated_At, "PPP")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-1">{i.work}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WorkReport;
