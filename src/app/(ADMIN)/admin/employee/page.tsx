import { EmployeeColumn } from "@/components/tables/EmployeeColumn";
import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/db/prisma";

const page = async () => {
  const employees = await prisma.employee.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      primary_contact: true,
      designation: true,
      department: true,
      employement_type: true,
      employee_id: true,
      userID: true,
    },
  });

  return (
    <div>
      <h1 className="my-2 text-2xl">Employee List</h1>
      <p>Total number of employees - {employees.length}</p>
      <div>
        <DataTable columns={EmployeeColumn} data={employees} />
      </div>
    </div>
  );
};

export default page;
