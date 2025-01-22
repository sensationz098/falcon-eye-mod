// import LeaveRequest from "@/components/ADMIN/LeaveRequest";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllLeaveRequest } from "@/db/AdminDbQueries";
import { format } from "date-fns";

const page = async () => {
  const leaves = await getAllLeaveRequest();

  if (leaves.length === 0) return <h1>no leave request found</h1>;

  return (
    <div>
      <h1>leave request page</h1>

      <Table>
        <TableCaption>All Leave Request</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Employee name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Half Day</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.emp_name}</TableCell>
              <TableCell>{leave.emp_name}</TableCell>
              <TableCell>{format(leave.start_date, "PPP")}</TableCell>
              <TableCell>{format(leave.end_date ?? "", "PPP")}</TableCell>
              <TableCell>{leave.leave_type}</TableCell>
              <TableCell>{leave.half_day}</TableCell>
              <TableCell>{format(leave.created_At, "PPP")}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{leave.approval}</TableCell>
              <TableCell>
                <Button variant={"default"}>Approve</Button>
                <Button
                  onClick={async () => {
                    "use server";
                    console.log("server");
                  }}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
