"use client";
import { createContext } from "react";

interface AttendanceContextType {
  months: number;
  setMonths: (month: number) => void;
}

export const AttendanceContext = createContext<AttendanceContextType>({
  months: new Date().getMonth(),
  setMonths: () => {},
});

export type { AttendanceContextType };
