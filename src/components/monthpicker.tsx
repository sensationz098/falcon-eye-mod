"use client";
import { useContext } from "react";
import { AttendanceContext } from "@/context/AttendanceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

export default function MonthPicker() {
  const router = useRouter();
  const context = useContext(AttendanceContext);
  if (!context)
    throw new Error("MonthPicker must be used within AttendanceContext");

  const { months, setMonths } = context;
  const currentMonth = new Date().getMonth();

  const HandleMonthChange = async (month: string) => {
    try {
      const monthNumber = parseInt(month);
      setMonths(monthNumber);

      // Use replace instead of push to force a full page refresh
      await router.replace(`/user/attendence?month=${monthNumber}`, {
        scroll: false,
      });
    } catch (error) {
      // Redirect to login if authentication error
      if (error instanceof Error && error.message.includes("not valid JSON")) {
        router.push("/auth/signin");
      }
    }
  };

  return (
    <Select onValueChange={HandleMonthChange} defaultValue={months.toString()}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Month" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 12 }, (_, i) => (
          <SelectItem key={i} value={i.toString()} disabled={i > currentMonth}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
