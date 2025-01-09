import { Button } from "@/components/ui/button";
import { getEmployeeById } from "@/db/AdminDbQueries";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/utils";
import CreatePayroll from "@/components/ADMIN/CreatePayroll";
import CreateBankAccount from "@/components/ADMIN/CreateBankAccount";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  const user = await getEmployeeById(_id);

  if (user?.Employee === null) {
    return (
      <div>
        <h1>No Employee details found</h1>
        <Link href={`/admin/employee/create/${_id}`}>
          <Button>Create Employee</Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <section>
        <Link href={`/admin/employee/update/${_id}`}>
          <Button>Update Employee</Button>
        </Link>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>{user?.Employee?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {user?.Employee.designation}, {user?.Employee.department}
          </p>
          <p>
            joined since{" "}
            {user?.Employee.date_of_joining
              ? formatDate(user?.Employee.date_of_joining, "PPP")
              : "N/A"}
          </p>
        </CardContent>
      </Card>

      {/* employee info */}
      <div className="my-2 flex flex-col items-center justify-center px-16">
        <h1 className="text-xl font-bold">Employee Information</h1>
        <Table className="mt-4 border">
          <TableCaption>Employee Information</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Information</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{user?.Employee.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{user?.Employee.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date of Birth</TableCell>
              <TableCell>
                {user?.Employee?.date_of_birth
                  ? formatDate(user?.Employee.date_of_birth, "PPP")
                  : "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{user?.Employee.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Primary Contact</TableCell>
              <TableCell>
                {formatNumber(
                  user?.Employee.primary_contact as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emergency Contact 1</TableCell>
              <TableCell>
                {formatNumber(
                  user?.Employee.emergency_contact_1 as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emergency Contact 2</TableCell>
              <TableCell>
                {formatNumber(
                  user?.Employee.emergency_contact_2 as string,
                  "mobile",
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{user?.Employee.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>{user?.Employee.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>{user?.Employee.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Aadhar No</TableCell>
              <TableCell>
                {formatNumber(user?.Employee.aadhar_no as string, "aadhar")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Permanent Address Number (PAN)</TableCell>
              <TableCell>{user?.Employee.PAN_no}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* salary and bank account info */}
      </div>

      {/* payroll and bank account details */}

      <div>
        {user?.payroll === null ? (
          <CreatePayroll id={_id} />
        ) : (
          <div className="my-3">
            <h1 className="my-2">Employee Salary Details</h1>
            <Table className="table-auto border">
              <TableCaption>Employee Salary Info</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Information</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>{user?.Employee.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.basic_salary as number)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>House Rental Allowence (HRA)</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.HRA as number)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Medical Allowence</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.medical as number)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Convenience Allowence</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.convenience as number)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Other Allowences</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.other_allowences as number)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Deducation</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.deducation as number)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Gross Salary</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.gross_salary as number)}
                  </TableCell>
                </TableRow>

                <TableRow className="font-bold">
                  <TableCell>Net Salary</TableCell>
                  <TableCell>
                    {formatCurrency(user?.payroll.net_salary as number)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {/* bank account detials section */}

        {user?.bank === null ? (
          <CreateBankAccount id={_id} />
        ) : (
          <div className="my-3">
            <h1 className="my-2">Bank Account Details</h1>
            <Table className="table-auto border">
              <TableCaption>Bank Account Info</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Information</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Account Holder Name</TableCell>
                  <TableCell>{user?.bank.account_holder_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Account Number</TableCell>
                  <TableCell className="font-semibold">
                    {user?.bank.account_no}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>{user?.bank.bank_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Branch</TableCell>
                  <TableCell>{user?.bank.branch}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IFSC Code</TableCell>
                  <TableCell>{user?.bank.IFSC_code}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
