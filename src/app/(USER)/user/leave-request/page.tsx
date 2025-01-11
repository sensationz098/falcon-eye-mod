import { Button } from "@/components/ui/button";
import LeaveRequestForm from "@/components/USER/LeaveRequestForm";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <h1>leave request page</h1>
      <Link href={"/user/leave-request/all-request"}>
        <Button>View All Leave Request</Button>
      </Link>
      <LeaveRequestForm />
    </div>
  );
};

export default page;
