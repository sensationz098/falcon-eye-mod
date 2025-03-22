import UpdatePayrollDetails from "@/components/ADMIN/UpdatePayrollDetails";
import UpdateEmployeeForm from "@/components/forms/UpdateEmployeeForm";
import { getEmployeeById } from "@/db/AdminDbQueries";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  const user = await getEmployeeById(_id);

  return (
    <div>
      <div>
        {user?.payroll !== null ? (
          <div className="flex gap-5 py-14">
            <h1>Update Employee</h1>
            <UpdatePayrollDetails payroll={user?.payroll} />
          </div>
        ) : (
          ""
        )}
      </div>
      <UpdateEmployeeForm employee={user?.Employee} />
    </div>
  );
};

export default page;
