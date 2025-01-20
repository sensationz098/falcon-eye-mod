export const revalidate = 3600;
// import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parse } from "date-fns";

const Page = async () => {
  const base64Auth = btoa(process.env.REALTIME_API_USERNAME! + ":" + "");

  const res = await fetch(
    `https://api.etimeoffice.com/api/DownloadInOutPunchData?Empcode=ALL&FromDate=17/01/2025&ToDate=17/01/2025
      `,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        Authorization: "Basic " + base64Auth,
        "Content-Type": "application/json",
      },
    },
  );
  const attendence: InOutPunchResponse = await res.json();

  const formattedDates = parse(
    attendence.InOutPunchData[0].DateString,
    "dd/mm/yyyy",
    new Date(),
  );

  console.log("the formatted date", format(formattedDates, "PPP"));

  return (
    <div>
      <Table>
        <TableCaption>A list of Attendences</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Emp Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Punch In Code</TableHead>
            <TableHead>Punch Out Code</TableHead>
            <TableHead>Work Time</TableHead>
            <TableHead>Late In</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendence?.InOutPunchData?.map(
            (i: InOutPunchData, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{i.Empcode}</TableCell>
                  <TableCell>{i.Name}</TableCell>
                  <TableCell>{i.DateString}</TableCell>
                  <TableCell>{i.INTime}</TableCell>
                  <TableCell>{i.OUTTime}</TableCell>
                  <TableCell>{i.WorkTime}</TableCell>
                  <TableCell>{i.Late_In}</TableCell>
                  <TableCell>{i.Status}</TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;

type InOutPunchData = {
  Empcode: string;
  INTime: string;
  OUTTime: string;
  WorkTime: string;
  OverTime: string;
  BreakTime: string;
  Status: string;
  DateString: string;
  Remark: string;
  Erl_Out: string;
  Late_In: string;
  Name: string;
};

type InOutPunchResponse = {
  InOutPunchData: InOutPunchData[];
  Error: boolean;
  Msg: string;
  IsAdmin: boolean;
};

//  sensationz82871@gmail.com
//  "InOutPunchData": [
//         {
//             "Empcode": "0001",
//             "INTime": "10:57",
//             "OUTTime": "--:--",
//             "WorkTime": "00:00",
//             "OverTime": "00:00",
//             "BreakTime": "00:00",
//             "Status": "P",
//             "DateString": "17/01/2025",
//             "Remark": "MIS-LT",
//             "Erl_Out": "00:00",
//             "Late_In": "01:57",
//             "Name": "Empname0001"
//         }
//     ],
