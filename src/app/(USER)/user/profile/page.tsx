import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  empTypes,
  formatCurrency,
  formatNumber,
  getSession,
} from "@/lib/utils";
import { formatDate } from "date-fns";

import { getUserProfile } from "@/db/UserDbQueries";

const page = async () => {
  const session = await getSession();
  const user = await getUserProfile({ _id: session?.user.id as string });

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
              <TableCell>{user?.Employee?.employee_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{user?.Employee?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{user?.Employee?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{user?.Employee?.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date of Birth</TableCell>
              <TableCell>
                {formatDate(
                  user?.Employee?.date_of_birth
                    ? user?.Employee?.date_of_birth
                    : "N/A",
                  "PPP",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{user?.Employee?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Primary Contact</TableCell>
              <TableCell>
                {formatNumber(
                  user?.Employee?.primary_contact as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emergency Contact 1</TableCell>
              <TableCell>
                {formatNumber(
                  user?.Employee?.emergency_contact_1 as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emergency Contact 2</TableCell>
              <TableCell>
                {formatNumber(
                  user?.Employee?.emergency_contact_2 as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>{user?.Employee?.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>{user?.Employee?.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Aadhar no</TableCell>
              <TableCell>
                {formatNumber(user?.Employee?.aadhar_no as string, "aadhar")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PAN no</TableCell>
              <TableCell>{user?.Employee?.PAN_no}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="text-md text-center font-bold">
                Other Details
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>{user?.Employee?.branch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>{user?.Employee?.designation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell>{user?.Employee?.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Employement Type</TableCell>
              <TableCell>
                {empTypes(user?.Employee?.employement_type as string)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date of Joining</TableCell>
              <TableCell>
                {formatDate(
                  user?.Employee?.date_of_joining
                    ? user?.Employee?.date_of_joining
                    : "N/A",
                  "PPP",
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <div className="md:flex md:flex-1 md:flex-row md:items-start md:justify-around md:gap-5">
        {/* Payroll Table  */}
        <section>
          {user?.payroll === null || <h1>No Payroll Information</h1>}

          <Table className="border">
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
                  {formatCurrency(user?.payroll?.basic_salary as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HRA</TableCell>
                <TableCell>
                  {formatCurrency(user?.payroll?.HRA as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medical deductions</TableCell>
                <TableCell>
                  {formatCurrency(user?.payroll?.medical as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Convenience</TableCell>
                <TableCell>
                  {formatCurrency(user?.payroll?.convenience as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Other Allowences</TableCell>
                <TableCell>
                  {formatCurrency(user?.payroll?.other_allowences as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Deducations</TableCell>
                <TableCell>
                  {formatCurrency(user?.payroll?.deducation as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gross Salary</TableCell>
                <TableCell>
                  {formatCurrency(user?.payroll?.gross_salary as number)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Salary</TableCell>
                <TableCell>
                  {formatCurrency(user?.payroll?.net_salary as number)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        {/* bank account information */}

        <section>
          <Table className="border">
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
