"use server";
import prisma from "@/db/prisma";
import {
  CreateWorkReportType,
  LeaveRequestSchemaType,
  UserSchemaType,
} from "@/types";
import { revalidatePath } from "next/cache";

export const UpdateUserAction = async (values: UserSchemaType, id: string) => {
  try {
    await prisma.user.update({ where: { id: id }, data: values });
    revalidatePath("/admin/user");
    return { status: true, message: "User updated successfully" };
  } catch (err: unknown | Error) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "Something went wrong" };
  }
};

export const UpdateWorkReport = async (
  values: CreateWorkReportType,
  userId: string,
) => {
  try {
    await prisma.workReport.create({
      data: {
        work: values.work,
        updated_At: values.updated_At,
        userID: userId,
      },
    });
    revalidatePath("/user/work-report");

    return { status: true, message: "work updated successfully" };
  } catch (err: unknown | Error) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "Something went wrong" };
  }
};

export const LeaveRequestAction = async (
  values: LeaveRequestSchemaType,
  name: string,
  id: string,
) => {
  try {
    await prisma.leaveRequest.create({
      data: {
        ...values,
        emp_name: name,
        emp_ID: id,
      },
    });

    revalidatePath("/admin/leave");
    return { status: true, message: "Leave request sent successfully" };
  } catch (err: unknown | Error) {
    if (err instanceof Error) return { error: err.message };
    console.log("something went wrong");
  }
};
