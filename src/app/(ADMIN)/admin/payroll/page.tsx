import prisma from "@/db/prisma";
import { PayrollColumn } from "@/components/tables/PayrollColumn";
import { DataTable } from "@/components/ui/DataTable";

const page = async () => {
  const payroll = await prisma.payroll.findMany({
    select: {
      id: true,
      basic_salary: true,
      gross_salary: true,
      net_salary: true,
      HRA: true,
      medical: true,
      convenience: true,
      other_allowences: true,
      deducation: true,
      employee: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Payroll info</h1>

      <DataTable columns={PayrollColumn} data={payroll} />
    </div>
  );
};

export default page;
