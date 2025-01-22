"use server";

import prisma from "@/db/prisma";
import { CreateWorkReportType, LeaveRequestSchemaType } from "@/types";
import { revalidatePath } from "next/cache";

export const createLeaveRequest = async (
  values: LeaveRequestSchemaType,
  userID: string,
  emp_name: string,
) => {
  try {
    console.log(values, userID, emp_name);
    await prisma.leaveRequest.create({
      data: {
        ...values,
        emp_name,
        userID,
      },
    });

    revalidatePath("/user", "page");
    return { status: true, message: "leave request sent successfully" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) return { status: false, error: err.message };
    return { status: false, error: "Internal server error" };
  }
};

export const createWorkReport = async (
  values: CreateWorkReportType,
  _id: string,
) => {
  try {
    await prisma.workReport.create({
      data: {
        ...values,
        userID: _id,
      },
    });

    revalidatePath("/", "page");
    return { status: true, message: "work report updated" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) return { status: false, error: err.message };

    return { status: false, error: "Internal server error" };
  }
};

export const deleteWorkReport = async (id: number) => {
  await prisma.workReport.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/user/work-report", "page");
  return;
};

export const updateWorkReport = async (id: number, work: string) => {
  try {
    await prisma.workReport.update({
      where: {
        id: id,
      },
      data: {
        work: work,
      },
    });

    revalidatePath("/user/work-report", "page");
    return { status: true, message: "Work Report Updated" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) return { status: false, error: err.message };
    return { status: false, error: "Internal server error" };
  }
};

export const deleteLeaveRequest = async (id: number) => {
  await prisma.leaveRequest.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/user/leave-request");
};
