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
import { Trash } from "lucide-react";

const page = async () => {
  const session = await getSession();
  const request = await getLeaveRequests({
    _id: session?.user.id as string,
    type: "ALL",
  });

  return (
    <div className="flex flex-col gap-5 px-11">
      <Link href={"/user/leave-request/apply"}>
        <Button>Apply for leave request</Button>
      </Link>

      <Table className="">
        <TableCaption>A list of your recent leave requests.</TableCaption>
        <TableHeader>
          <TableHead>Created At</TableHead>
          <TableHead>Leave Type</TableHead>
          <div className="hidden w-[450px] md:flex md:flex-row md:items-center md:justify-around">
            <TableHead className="">Status</TableHead>
            <TableHead className="">Actions</TableHead>
          </div>
          <TableHead className="block md:hidden">Ations</TableHead>
        </TableHeader>
        <TableBody className="h-16">
          {request.length != 0 ? (
            request.map((leave) => (
              <TableRow key={leave.id} className="h-10">
                <TableCell>{format(leave.created_At, "PPP")}</TableCell>
                <TableCell>{leave.leave_type}</TableCell>
                <div className="hidden w-[550px] md:flex md:flex-row md:items-center md:justify-center">
                  <TableCell>{leave.approval}</TableCell>
                  <TableCell className="ml-14 flex gap-4">
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
                </div>
                <TableCell className="block md:hidden">
                  <ViewDetails leave={leave} />
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
                <p>Leave Type : {leave.leave_type}</p>
              </section>
              <div className="flex justify-between">
                <section className="my-2">
                  <p>Reason : {leave.reason}</p>
                  <p className="text-yellow-500">{leave.approval}</p>
                </section>
                <section className="my-2">
                  <Button
                    onClick={async () => {
                      "use server";
                      await deleteLeaveRequest(leave.id);
                    }}
                    variant={"destructive"}
                    className="flex w-28 flex-row items-center justify-center gap-1 text-white"
                  >
                    <p>Delete</p>
                    <Trash />
                  </Button>
                </section>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
