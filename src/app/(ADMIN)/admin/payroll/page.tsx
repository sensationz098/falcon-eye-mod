export const dynamic = "force-dynamic";

import { PayrollColumn } from "@/components/tables/PayrollColumn";
import { PayrollDataTable } from "@/components/tables/PayrollDataTable";
import { getAllPayroll } from "@/db/AdminDbQueries";

const page = async () => {
  const payroll = await getAllPayroll();

  return (
    <div>
      <h1>Employee Payroll Table</h1>
      <p>total {payroll.length} Payroll Found</p>
      <PayrollDataTable columns={PayrollColumn} data={payroll} />
    </div>
  );
};

export default page;
