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

export default function LateDeduction(
  data: DownloadInOutPunchDataType[],
  branch: string,
) {
  let Lat = 0;
  let H = 0;
  let SrtLeave = 0;
  data.forEach((i) => {
    const inTimeFormat = formatDatefromString(i.DateString, i.INTime);
    const inTimeDate = new Date(inTimeFormat);
    const LateTime = differenceInMinutes(
      formatDatefromString(i.DateString, "09:05"),
      inTimeDate,
    );

    const outTimeFormat = formatDatefromString(i.DateString, i.OUTTime);
    const outTimeDate = new Date(outTimeFormat);

    const branchOutTime = branch.toUpperCase() !== "DELHI" ? "17:00" : "18:00";
    const outTime = differenceInMinutes(
      formatDatefromString(i.DateString, branchOutTime),
      outTimeDate,
    );

    // if (LateTime > -1 && outTime <= 0) return;
    if (LateTime <= -1) {
      if (
        (LateTime < -70 && isSunday(inTimeDate)) ||
        (LateTime <= -11 && !isSunday(inTimeDate))
      ) {
        // console.log("Lele Half Day in time", LateTime, " and ", inTimeDate);
        H++;
      } else if (
        (LateTime <= -60 && isSunday(inTimeDate)) ||
        (LateTime <= -1 && !isSunday(inTimeDate))
      ) {
        // console.log("Lele Late in time", LateTime, " and ", inTimeDate);
        Lat++;
      }
    }

    if (outTime > 0 && outTime <= 60) {
      // console.log("Lele short leave out time", outTime, " and ", outTimeDate);
      SrtLeave++;
    } else if (outTime > 60) {
      // console.log("Lele half day out time", outTime, " and ", outTimeDate);
      H++;
    }
  });
  H += Math.floor(SrtLeave / 3);

  return H + Math.floor(Lat / 3);
}

function formatDatefromString(DateString: string, timeString: string) {
  return parse(`${DateString}-${timeString}`, "dd/MM/yyyy-HH:mm", new Date());
}
