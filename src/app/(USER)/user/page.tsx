import LeaveRequest from "@/components/USER/LeaveRequest";
import UserHeader from "@/components/USER/UserHeader";
import WorkReport from "@/components/USER/WorkReport";
import WorkReportUpdate from "@/components/USER/WorkReportUpdate";
import { getEmpIdById } from "@/db/UserDbQueries";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  const isEmployeeAvailable = await getEmpIdById(session?.user.id as string);

  if (isEmployeeAvailable === null)
    return <h1>ask HR to create employee details</h1>;

  return (
    <div>
      <UserHeader _id={session?.user.id as string} />
      <WorkReportUpdate userID={session?.user.id as string} />

      <div className="flex flex-1 flex-col md:flex-row">
        <WorkReport userID={session?.user.id as string} />
        <LeaveRequest userID={session?.user.id as string} />
      </div>
    </div>
  );
};

export default page;
