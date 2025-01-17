import { CreateHolidayForm } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHolidays } from "@/db/AdminDbQueries";

import { format } from "date-fns";

const page = async () => {
  const hoildays = await getHolidays();

  return (
    <div>
      <h1>List of all holidays</h1>
      <div className="flex max-w-xl flex-col md:flex-row">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hoildays.map((i, index) => {
              return (
                <TableRow key={i.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{format(i.holiday_date, "PPP")}</TableCell>
                  <TableCell>{i.title}</TableCell>
                  <TableCell>{i.message}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <CreateHolidayForm />
    </div>
  );
};

export default page;
