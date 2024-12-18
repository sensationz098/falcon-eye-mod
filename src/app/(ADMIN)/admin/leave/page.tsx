import { LeaveColumns } from "@/components/tables/LeaveColumn";
import { LeaveRequestDataTable } from "@/components/tables/LeaveRequestDataTable";
import prisma from "@/db/prisma";

const Page = async () => {
  const requests = await prisma.leaveRequest.findMany({
    select: {
      id: true,
      emp_name: true,
      start_date: true,
      end_date: true,
      leave_type: true,
      half_day: true,
      created_At: true,
      reason: true,
      approval: true,
    },
  });

  return (
    <div>
      <h1 className="text-center">apply for leave request</h1>
      <div className="">
        <LeaveRequestDataTable columns={LeaveColumns} data={requests} />
      </div>
    </div>
  );
};

export default Page;
