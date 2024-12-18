import CreateWorkReport from "@/components/USER/CreateWorkReport";
import LeaveRequest from "@/components/USER/LeaveRequest";
import UserHeader from "@/components/USER/UserHeader";
import WorkReport from "@/components/USER/WorkReport";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  return (
    <div>
      <UserHeader />
      <CreateWorkReport _id={session?.user?.id as string} />
      <div className="flex flex-col items-center border md:flex-row">
        <WorkReport _id={"67611c6666996d7f2e52be72"} />
        <LeaveRequest />
      </div>
    </div>
  );
};

export default page;
