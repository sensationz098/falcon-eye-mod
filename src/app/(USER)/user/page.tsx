import CreateWorkReport from "@/components/USER/CreateWorkReport";
import UserHeader from "@/components/USER/UserHeader";
import { getSession } from "@/lib/utils";

const page = async () => {
  const session = await getSession();
  return (
    <div>
      <UserHeader />
      <CreateWorkReport _id={session?.user?.id as string} />
    </div>
  );
};

export default page;
