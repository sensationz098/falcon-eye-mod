"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import {
  UserSchemaType,
  EmployeeSchemaType,
  CreateSalarySchemaType,
  CreateBankAccountSchemaType,
} from "@/types";

export const addUserAction = async (values: UserSchemaType) => {
  try {
    await prisma.user.create({
      data: { ...values },
    });

    revalidatePath("/admin/user", "page");
    return { status: true, message: "user added" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) return { status: false, error: err.message };
    return { status: false, error: "Internal server error" };
  }
};

export const addEmployeeAction = async ({
  values,
  _id,
}: {
  values: EmployeeSchemaType;
  _id: string;
}) => {
  try {
    await prisma.employee.create({
      data: {
        ...values,
        userID: _id,
      },
    });

    revalidatePath(`/admin/employee`, "page");
    return { status: true, message: "Employee created successfully" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      return { status: false, error: err.message };
    }
    return { status: false, error: "Internal server error" };
  }
};

export const createPayrollAction = async ({
  id,
  values,
}: {
  values: CreateSalarySchemaType;
  id: string;
}) => {
  try {
    const payroll_info = {
      ...values,
      gross_salary:
        (values.basic_salary +
          values.HRA +
          values.medical +
          values.convenience +
          values.other_allowences) *
        12,

      net_salary:
        values.basic_salary -
        (values.deducation +
          values.HRA +
          values.medical +
          values.convenience +
          values.other_allowences),

      userID: id,
    };

    await prisma.payroll.create({
      data: {
        ...payroll_info,
      },
    });

    revalidatePath(`/admin/user/${id}`, "page");
    return { status: true, message: "Payroll created" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) return { status: false, error: err.message };
    return { status: false, error: "Internal server error" };
  }
};

export const createBankAccountDetails = async ({
  id,
  values,
}: {
  values: CreateBankAccountSchemaType;
  id: string;
}) => {
  try {
    await prisma.bankAccount.create({
      data: {
        ...values,
        userID: id,
      },
    });

    revalidatePath(`/admin/user/${id}`, "page");
    return { status: true, message: "Bank details created" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) return { status: false, error: err.message };
    return { status: false, error: "Internal server error" };
  }
};
