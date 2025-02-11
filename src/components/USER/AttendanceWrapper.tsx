"use client";
import { ReactNode, Suspense } from "react";
import { AttendanceContext } from "@/context/AttendanceContext";

interface AttendanceWrapperProps {
  children: ReactNode;
  onMonthChange: (month: number) => void;
  currentMonth: number;
}

export default function AttendanceWrapper({
  children,
  onMonthChange,
  currentMonth,
}: AttendanceWrapperProps) {
  return (
    <AttendanceContext.Provider
      value={{ months: currentMonth, setMonths: onMonthChange }}
    >
      <Suspense fallback={<h1>Loading</h1>}>{children}</Suspense>
    </AttendanceContext.Provider>
  );
}
