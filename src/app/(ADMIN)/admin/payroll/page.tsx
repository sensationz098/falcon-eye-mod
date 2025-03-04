export const dynamic = "force-dynamic";

import { PayrollColumn } from "@/components/tables/PayrollColumn";
import { PayrollDataTable } from "@/components/tables/PayrollDataTable";
import { getAllPayroll } from "@/db/AdminDbQueries";

const page = async () => {
  const payroll = await getAllPayroll();

  return (
    <div>
      <PayrollDataTable
        columns={PayrollColumn}
        data={payroll}
        payrollLength={payroll.length}
      />
    </div>
  );
};

export default page;
