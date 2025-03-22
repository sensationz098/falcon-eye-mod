"use client";
import { ReactNode, Suspense } from "react";
import { AttendanceContext } from "@/context/AttendanceContext";
import { AttendanceSkeleton } from "../AttendanceSkeleton";
// import { Skeleton } from "../ui/skeleton";

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
      <Suspense fallback={<AttendanceSkeleton />}>{children}</Suspense>
    </AttendanceContext.Provider>
  );
}
