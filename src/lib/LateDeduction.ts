import { differenceInMinutes, isSunday, parse } from "date-fns";
export type DownloadInOutPunchDataType = {
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

export default function LateDeduction(data: DownloadInOutPunchDataType[]) {
  let Lat = 0;
  let H = 0;
  data.forEach((i) => {
    const inTimeFormat = formatDatefromString(i.DateString, i.INTime);
    const inTimeDate = new Date(inTimeFormat);
    const LateTime = differenceInMinutes(
      formatDatefromString(i.DateString, "09:05"),
      inTimeDate,
    );

    if (LateTime >= -1) return;
    if (LateTime < -1) {
      if (
        (LateTime < -70 && isSunday(inTimeDate)) ||
        (LateTime < -11 && !isSunday(inTimeDate))
      ) {
        H++;
      } else if (
        (LateTime < -60 && isSunday(inTimeDate)) ||
        (LateTime < -1 && !isSunday(inTimeDate))
      ) {
        Lat++;
      }
    }
  });

  return H + Math.floor(Lat / 3);
}

function formatDatefromString(DateString: string, timeString: string) {
  return parse(`${DateString}-${timeString}`, "dd/MM/yyyy-HH:mm", new Date());
}
