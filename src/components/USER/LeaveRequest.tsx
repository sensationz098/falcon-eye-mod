import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "date-fns";
import { getLeaveRequests } from "@/db/UserDbQueries";

const LeaveRequest = async ({ userID }: { userID: string }) => {
  const leave_request = await getLeaveRequests({ _id: userID, type: "THREE" });
  return (
    <div className="w-10/12 p-2 md:w-5/12">
      <h1 className="text-center">Leave Requests</h1>

      <div className="my-3 h-0.5 w-full bg-primary" />
      <div className="flex flex-col gap-5">
        {leave_request.length !== 0 ? (
          leave_request.map((i) => {
            return (
              <Card key={i.id}>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-500">
                    {formatDate(i.start_date, "PPP")} -{" "}
                    {formatDate(i.end_date as Date, "PPP")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="line-clamp-1">{i.reason}</p>
                  <p className="animate-pulse text-xs">{i.approval}</p>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div>
            <h1>No Leave Request Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;
