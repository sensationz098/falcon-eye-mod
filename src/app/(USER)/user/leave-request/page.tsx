import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLeaveRequests } from "@/db/UserDbQueries";
import { getSession } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeaveRequest } from "@prisma/client";
import { deleteLeaveRequest } from "@/server/USER/userServerActions";

const page = async () => {
  const session = await getSession();
  const request = await getLeaveRequests({
    _id: session?.user.id as string,
    type: "ALL",
  });

  return (
    <div>
      <Link href={"/user/leave-request/apply"}>
        <Button>Apply for leave request</Button>
      </Link>

      <Table>
        <TableCaption>A list of your recent leave requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {request.length != 0 ? (
            request.map((leave, index) => (
              <TableRow key={leave.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{format(leave.created_At, "PPP")}</TableCell>
                <TableCell>{leave.leave_type}</TableCell>
                <TableCell>{leave.approval}</TableCell>
                <TableCell className="flex gap-4">
                  <ViewDetails leave={leave} />
                  <Button
                    onClick={async () => {
                      "use server";
                      await deleteLeaveRequest(leave.id);
                    }}
                    variant={"destructive"}
                    className="rounded-[5px]"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No leave Request Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;

function ViewDetails({ leave }: { leave: LeaveRequest }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>View Leave</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Request Details</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <p>Starting Date</p>
                  <p>Total Days</p>
                  <p>Ending Date</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>{format(leave.start_date, "PPP")}</p>
                  <p>
                    {differenceInDays(
                      leave.end_date ? leave.end_date : "",
                      leave.start_date,
                    )}
                  </p>
                  <p>{format(leave.end_date as Date, "PPP")}</p>
                </div>
              </div>

              <section className="flex items-center justify-between">
                <p>Half Day : {leave.half_day}</p>
                <p>Leave Type : {leave.leave_type}</p>
              </section>
              <section className="my-2">
                <p>Reason : {leave.reason}</p>
                <p className="text-yellow-500">{leave.approval}</p>
              </section>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
