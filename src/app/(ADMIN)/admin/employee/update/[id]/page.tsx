import UpdatePayrollDetails from "@/components/ADMIN/UpdatePayrollDetails";
import UpdateEmployeeForm from "@/components/forms/UpdateEmployeeForm";
import { getEmployeeById } from "@/db/AdminDbQueries";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  const user = await getEmployeeById(_id);

  return (
    <div>
      <h1>Update Employee Details {_id}</h1>

      <UpdatePayrollDetails payroll={user?.payroll} />
      <UpdateEmployeeForm employee={user?.Employee} />
    </div>
  );
};

export default page;
