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
import { format, differenceInDays } from "date-fns";

const page = async () => {
  const session = await getSession();
  const request = await getLeaveRequests({
    _id: session?.user.id as string,
    type: "ALL",
  });

  if (request.length === 0) return <h1>no request found</h1>;

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent leave requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Half Day</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {request.map((leave, index) => (
            <TableRow key={leave.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{format(leave.start_date, "PPP")}</TableCell>
              <TableCell>{format(leave.end_date ?? "", "PPP")}</TableCell>
              <TableCell>
                {differenceInDays(leave.end_date ?? 0, leave.start_date) + 1}
              </TableCell>
              <TableCell>{leave.half_day}</TableCell>
              <TableCell>{leave.leave_type}</TableCell>
              <TableCell>{format(leave.created_At, "PPP")}</TableCell>
              <TableCell>{leave.approval}</TableCell>
              <TableCell>{"actions"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
