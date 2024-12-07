import prisma from "@/db/prisma";
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
import { Button } from "@/components/ui/button";
import UpdateUser from "@/components/ADMIN/UpdateUser";
import CreateSalary from "@/components/ADMIN/CreateSalary";
import { formatCurrency } from "@/lib/utils";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  const user = await prisma.user.findFirst({
    where: { id: _id },
    include: { employee: true },
  });

  const salary = await prisma.payroll.findFirst({
    where: { empID: user?.employee?.id },
    include: { bank: true },
  });

  if (user?.employee === null)
    return (
      <div>
        <h1>No Employee details found</h1>
        <Link href={`/admin/employee/create/${user.id}`}>
          <Button className="rounded-[5px]">Create Employee</Button>
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold">{user?.name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{user?.employee.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {user?.employee.designation}, {user?.employee.department}
          </p>
          <p>
            joined since{" "}
            {user?.employee?.date_of_joining
              ? formatDate(user.employee.date_of_joining, "PPP")
              : "N/A"}
          </p>
        </CardContent>
      </Card>

      {user && (
        <div>
          <UpdateUser user={user} />
        </div>
      )}

      {/* employee info */}
      <div className="my-2">
        <Table className="mt-4 max-w-[500px] table-auto rounded-[5px] border-t-2">
          <TableHeader>
            <TableRow>
              <TableHead>Information</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{user?.employee.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{user?.employee.gender}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Date of Birth</TableCell>
              <TableCell>
                {user?.employee?.date_of_birth
                  ? formatDate(user.employee.date_of_birth, "PPP")
                  : "N/A"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{user?.employee.email}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Primary Contact</TableCell>
              <TableCell>{user?.employee.primary_contact}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Emergency Contact 1</TableCell>
              <TableCell>{user?.employee.emergency_contact_1}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Emergency Contact 2</TableCell>
              <TableCell>{user?.employee.emergency_contact_2}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{user?.employee.address}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>{user?.employee.city}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>{user?.employee.country}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Aadhar No</TableCell>
              <TableCell>{user?.employee.aadhar_card}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Permanent Address Number (PAN)</TableCell>
              <TableCell>{user?.employee.PAN_no}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* salary and bank account info */}
      <div className="flex w-full">
        {/* salary info */}
        {salary === null ? (
          <div>
            <h1>No salary details found</h1>
            <CreateSalary _id={user?.employee.id as string} />
          </div>
        ) : (
          <div className="my-3">
            <h1>Employee Salary Details</h1>
            <Table className="table-auto">
              <TableCaption>Employee Salary Info</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Information</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>{salary?.empID}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell>{formatCurrency(salary?.basic_salary)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>House Rental Allowence (HRA)</TableCell>
                  <TableCell>{formatCurrency(salary?.HRA ?? 0)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Medical Allowence</TableCell>
                  <TableCell>{formatCurrency(salary?.medical ?? 0)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Convenience Allowence</TableCell>
                  <TableCell>
                    {formatCurrency(salary?.convenience ?? 0)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Other Allowences</TableCell>
                  <TableCell>
                    {formatCurrency(salary?.other_allowences ?? 0)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Deducation</TableCell>
                  <TableCell>
                    {formatCurrency(salary?.deducation ?? 0)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Gross Salary</TableCell>
                  <TableCell>
                    {formatCurrency(salary?.gross_salary ?? 0)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Net Salary</TableCell>
                  <TableCell>
                    {formatCurrency(salary?.net_salary ?? 0)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {/* bank info */}
        <div>
          <Table>
            <TableCaption>Bank Account Info</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Information</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
