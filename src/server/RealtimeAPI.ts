import { format, startOfMonth, endOfMonth } from "date-fns";

const base64Auth = btoa(process.env.REALTIME_API_USERNAME! + ":" + "");
const today = format(new Date(), "dd/MM/yyyy");

export const fetchAttendence = async ({ params }: { params: string }) => {
  if (params === "ALL") {
    const res = await fetch(
      `https://api.etimeoffice.com/api/DownloadInOutPunchData?Empcode=${params}&ToDate=${today}
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
    return attendence;
  }

  if (params !== "ALL") {
    const res = await fetch(
      `https://api.etimeoffice.com/api/DownloadInOutPunchData?Empcode=${params}&FromDate=${format(startOfMonth(new Date()), "dd/MM/yyyy")}&ToDate=${format(endOfMonth(new Date()), "dd/MM/yyyy")}
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
    return attendence;
  }
};

export type InOutPunchData = {
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

export type InOutPunchResponse = {
  InOutPunchData: InOutPunchData[];
  Error: boolean;
  Msg: string;
  IsAdmin: boolean;
};
