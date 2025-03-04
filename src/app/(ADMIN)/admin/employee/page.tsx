export const dynamic = "force-dynamic";

import { DataTable } from "@/components/ui/DataTable";
import { EmployeeColumn } from "@/components/tables/EmployeeColumn";
import { getAllEmployee } from "@/db/AdminDbQueries";

const page = async () => {
  const employees = await getAllEmployee();

  return (
    <div className="my-4">
      <DataTable columns={EmployeeColumn} data={employees} />
    </div>
  );
};

export default page;
