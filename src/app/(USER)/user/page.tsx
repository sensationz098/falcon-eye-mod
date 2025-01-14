import LeaveRequest from "@/components/USER/LeaveRequest";
import UserHeader from "@/components/USER/UserHeader";
import WorkReport from "@/components/USER/WorkReport";
import WorkReportUpdate from "@/components/USER/WorkReportUpdate";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();

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
