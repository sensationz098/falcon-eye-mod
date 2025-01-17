// export const dynamic = "force-dynamic";

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

const Page = async () => {
  // const username = "Sensationz:Sensationz:SENSATIONZ@123:true";
  // const password = "";

  // const base64Auth = btoa(username + ":" + password);

  const today = new Date(2025);
  const startDate = `1/${today.getMonth() + 1}/${today.getFullYear()}`;
  const lastDate = new Date(2025, 4, 0);
  console.log("the last date", lastDate);
  console.log(startDate);

  // const res = await fetch(
  //   `https://api.etimeoffice.com/api/DownloadPunchData?Empcode=ALL&FromDate=01/01/2025_01:00&ToDate=31/01/2025_00:00
  //     `,
  //   {
  //     cache: "force-cache",
  //     method: "GET",
  //     headers: {
  //       Authorization: "Basic " + base64Auth,
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
  // const attendence = await res.json();

  return (
    <div>
      <Table>
        <TableCaption>A list of Attendences</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {attendence?.PunchData?.map((i) => {
            return (
              <TableRow key={i.PunchDate}>
                <TableCell>{i.Empcode}</TableCell>
                <TableCell>{i.Name}</TableCell>
                <TableCell>{i.PunchDate}</TableCell>
                <TableCell>{i.M_Flag ?? "NO "}</TableCell>
              </TableRow>
            );
          })} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
