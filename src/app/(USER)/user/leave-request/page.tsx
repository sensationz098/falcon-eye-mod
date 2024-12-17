import { getSession } from "@/lib/utils";
import LeaveRequestForm from "@/components/forms/LeaveRequest";

const page = async () => {
  const session = await getSession();
  return (
    <div>
      <h1>Apply for leave request application</h1>

      <LeaveRequestForm
        name={session?.user.name as string}
        id={session?.user.id as string}
      />
    </div>
  );
};

export default page;
