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

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  const user = await prisma.user.findFirst({
    where: { id: _id },
    include: { employee: true },
  });

  if (user?.employee === null)
    return (
      <div>
        <h1>No Employee details found</h1>
        <Link href={`/admin/employee/create/${user.id}`}>Create Employee</Link>
      </div>
    );
  return (
    <div>
      <h1 className="text-3xl font-bold">{_id}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{user?.employee.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {user?.employee.designation}, {user?.employee.department}
          </p>
          <p>
            joined since
            {user?.employee?.date_of_joining
              ? formatDate(user.employee.date_of_joining, "PPP")
              : "N/A"}
          </p>
        </CardContent>
      </Card>

      <Table className="mt-4 rounded-[5px] border-t-2">
        <TableCaption>A list of your recent invoices.</TableCaption>
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
  );
};

export default page;
