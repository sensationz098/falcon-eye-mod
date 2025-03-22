import React from "react";
import { SkeletonTable } from "./SkeletonTable";
import { Skeleton } from "./ui/skeleton";

export const AttendanceSkeleton = () => {
  return (
    <div>
      <div>
        <h1 className="mt-14 w-full text-center text-5xl font-bold text-[#3576DF]">
          Attendance
        </h1>
        <div className="my-8 flex flex-col items-center justify-evenly gap-10 md:flex-col">
          <div className="flex w-full items-center justify-around">
            <h2 className="text-xl font-normal text-white">
              Total Present:{" "}
              <span className="text-green-500">
                {" "}
                <Skeleton className="h-4 w-[200px]" />
              </span>
            </h2>
            <h2 className="text-xl font-normal text-white">
              Total Absent:{" "}
              <span className="text-red-500">
                {" "}
                <Skeleton className="h-4 w-[200px]" />
              </span>
            </h2>
            <h2 className="text-xl font-normal text-white">
              Total WeekOff:{" "}
              <span className="text-yellow-500">
                {" "}
                <Skeleton className="h-4 w-[200px]" />
              </span>
            </h2>
          </div>
          <div className="flex w-full flex-col items-center justify-around md:flex-row">
            <h2 className="text-xl font-normal text-white">
              Total Holiday: <Skeleton className="h-4 w-[200px]" />
            </h2>
            <h2 className="text-xl font-normal text-white">
              Total Salary:
              <span className="text-yellow-500">
                {" "}
                <Skeleton className="h-4 w-[200px]" />
              </span>
            </h2>
            <h2 className="text-xl font-normal text-white">
              <Skeleton className="h-4 w-[200px]" />
            </h2>
          </div>
        </div>
        <div className="md:px-20">
          <SkeletonTable />
        </div>
      </div>
    </div>
  );
};
