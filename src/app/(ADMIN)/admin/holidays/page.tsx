import { CreateHolidayForm } from "@/components";
import { Button } from "@/components/ui/button";
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
import { deleteHoliday } from "@/server/ADMIN/serverActions";

import { format } from "date-fns";
// import { Hello } from "./hello";

const page = async () => {
  const hoildays = await getHolidays();

  return (
    <div>
      {/* <h1>List of all holidays</h1> */}
      <div className="flex h-[900px] w-full flex-col justify-around py-12 md:flex-row">
        {/* <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Actions</TableHead>
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
                  <TableCell>
                    <Button
                      variant={"destructive"}
                      onClick={async () => {
                        "use server";
                        await deleteHoliday(i.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <div className="h-full w-1/2 rounded-3xl bg-gray-700 p-4"> */}
        {/* <Hello /> */}
        {/* </div> */}

        <div className="w-1/4 rounded-3xl bg-gray-700 p-4">
          <CreateHolidayForm />
        </div>
      </div>
    </div>
  );
};

export default page;
