import { format } from "date-fns";

const base64Auth = btoa(process.env.REALTIME_API_USERNAME! + ":" + "");
const today = format(new Date(), "dd/MM/yyyy");

export const fetchAttendence = async ({
  params,
  start,
  end,
}: {
  params: string;
  start?: string;
  end?: string;
}) => {
  if (params === "ALL") {
    const res = await fetch(
      `https://api.etimeoffice.com/api/DownloadInOutPunchData?Empcode=${params}&ToDate=${today}`,
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
      `https://api.etimeoffice.com/api/DownloadInOutPunchData?Empcode=${params}&FromDate=${start}&ToDate=${end}
          `,
      {
        // cache: "force-cache",
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

export const fetchPresent = async () => {
  try {
    const res = await fetch(
      `https://api.etimeoffice.com/api/DownloadInOutPunchData?Empcode=ALL&ToDate=${today}
      `,
      {
        // cache: "force-cache",
        method: "GET",
        headers: {
          Authorization: "Basic " + base64Auth,
          "Content-Type": "application/json",
        },
      },
    );
    const attendence: InOutPunchResponse = await res.json();

    return { status: true, present: attendence.InOutPunchData.length };
  } catch (err: Error | unknown) {
    const error = err instanceof Error ? err.message : "Faild to fetch";

    return { status: false, error: error };
  }
};

export type InOutPunchData = {
  Empcode: string;
  INTime: string;
  OUTTime: string;
  WorkTime: string;
  OverTime: string;
  BreakTime: string;
  Status: "A" | "P";
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
