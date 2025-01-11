import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllWorkReport } from "@/db/UserDbQueries";
import { formatDate } from "date-fns";

const WorkReport = async ({ userID }: { userID: string }) => {
  const work_report = await getAllWorkReport({ _id: userID, type: "THREE" });

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
