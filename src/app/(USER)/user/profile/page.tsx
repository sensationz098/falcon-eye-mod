import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import prisma from "@/db/prisma";
import {
  empTypes,
  formatCurrency,
  formatNumber,
  getSession,
} from "@/lib/utils";
import { formatDate } from "date-fns";

const page = async () => {
  const session = await getSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: { employee: true },
  });

  const payroll = await prisma.payroll.findFirst({
    where: {
      empID: user?.employee?.id,
    },
    include: { employee: true },
  });

  return (
    <div className="px-4">
      {/*  personal details table */}
      <section>
        <Table className="border">
          <TableCaption>Employee Details</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Information</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>{user?.employee?.employee_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{user?.employee?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{user?.employee?.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date of Birth</TableCell>
              <TableCell>
                {formatDate(
                  user?.employee?.date_of_birth
                    ? user?.employee?.date_of_birth
                    : "N/A",
                  "PPP",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{user?.employee?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Primary Contact</TableCell>
              <TableCell>
                {formatNumber(
                  user?.employee?.primary_contact as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emergency Contact 1</TableCell>
              <TableCell>
                {formatNumber(
                  user?.employee?.emergency_contact_1 as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emergency Contact 2</TableCell>
              <TableCell>
                {formatNumber(
                  user?.employee?.emergency_contact_2 as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>{user?.employee?.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>{user?.employee?.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Aadhar no</TableCell>
              <TableCell>
                {formatNumber(user?.employee?.aadhar_card as string, "aadhar")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PAN no</TableCell>
              <TableCell>{user?.employee?.PAN_no}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="text-md text-center font-bold">
                Other Details
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>{user?.employee?.branch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>{user?.employee?.designation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell>{user?.employee?.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Employement Type</TableCell>
              <TableCell>
                {empTypes(user?.employee?.employement_type as string)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date of Joining</TableCell>
              <TableCell>
                {formatDate(
                  user?.employee?.date_of_joining
                    ? user?.employee?.date_of_joining
                    : "N/A",
                  "PPP",
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <div className="md:flex md:flex-1 md:flex-row md:items-center md:justify-center md:gap-5">
        {/* Payroll Table  */}
        <section>
          <Table>
            <TableCaption>Payroll Information</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Information</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Basic Salary</TableCell>
                <TableCell>
                  {formatCurrency(payroll?.basic_salary as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HRA</TableCell>
                <TableCell>{formatCurrency(payroll?.HRA as number)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medical deductions</TableCell>
                <TableCell>
                  {formatCurrency(payroll?.medical as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Convenience</TableCell>
                <TableCell>
                  {formatCurrency(payroll?.convenience as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Other Allowences</TableCell>
                <TableCell>
                  {formatCurrency(payroll?.other_allowences as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Deducations</TableCell>
                <TableCell>
                  {formatCurrency(payroll?.deducation as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gross Salary</TableCell>
                <TableCell>
                  {formatCurrency(payroll?.gross_salary as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Salary</TableCell>
                <TableCell>
                  {formatCurrency(payroll?.net_salary as number)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        {/* bank account information */}

        <section>
          <Table>
            <TableCaption>Bank Account Information</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Information</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Account Holder Name</TableCell>
                <TableCell>{"holder name"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Account No</TableCell>
                <TableCell>{"account number"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bank Name</TableCell>
                <TableCell>{"bank name"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Branch</TableCell>
                <TableCell>{"branch"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IFSC Code</TableCell>
                <TableCell>{"ifsc code"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
};

export default page;
