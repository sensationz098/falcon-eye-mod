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

//  {
//     id: 'cm5p9dve7000bv10oknuyalnh',
//     basic_salary: 25000,
//     convenience: 0,
//     deducation: 0,
//     gross_salary: 300000,
//     deducation: 0,
//     gross_salary: 300000,
//     HRA: 0,
//     medical: 0,
//     net_salary: 25000,
//     other_allowences: 0,
//     user: { id: 'cm5p5btu60002v1k0by0bs9to', name: 'steve' }
//   }
