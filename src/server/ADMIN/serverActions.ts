"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import {
  UserSchemaType,
  EmployeeSchemaType,
  CreateSalarySchemaType,
  CreateBankAccountSchemaType,
  HolidaySchemaType,
  UpdateEmployeeSchemaType,
  UpdatePayrollDetailsSchemaType,
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

export const createHoliday = async (values: HolidaySchemaType) => {
  try {
    await prisma.holiday.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/admin/holidays", "page");
    return { status: true, message: "Holiday created" };
  } catch (err: Error | unknown) {
    if (err instanceof Error) return { status: false, error: err.message };
    return { status: false, error: "Internal server error" };
  }
};

export const deleteHoliday = async (_id: number) => {
  await prisma.holiday.delete({
    where: {
      id: _id,
    },
  });

  revalidatePath("/admin/holidays", "page");
  return;
};

export const deleteUser = async (_id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: _id,
      },
    });

    revalidatePath("/admin/user", "page");
  } catch (err: Error | unknown) {
    const error = err instanceof Error ? err.message : "Internal server error";

    return { status: false, error: error };
  }
};

export const actionLeaveRequest = async ({
  id,
  type,
}: {
  id: number;
  type: "APPROVE" | "DECLINE" | "DELETE";
}) => {
  try {
    switch (type) {
      case "APPROVE":
        await prisma.leaveRequest.update({
          where: {
            id: id,
          },
          data: {
            approval: "ACCEPT",
          },
        });
        revalidatePath("/admin/leave-request", "page");
        break;

      case "DECLINE":
        await prisma.leaveRequest.update({
          where: {
            id: id,
          },
          data: {
            approval: "REJECT",
          },
        });
        revalidatePath("/admin/leave-request", "page");
        break;

      case "DELETE":
        await prisma.leaveRequest.update({
          where: {
            id: id,
          },
          data: {
            approval: "CANCEL",
          },
        });
        revalidatePath("/admin/leave-request", "page");
        break;
    }
  } catch (err: Error | unknown) {
    const error = err instanceof Error ? err.message : "Internal Server Error";
    return { status: false, error: error };
  }
};

export const updateEmployeeDetails = async (
  values: UpdateEmployeeSchemaType,
) => {
  try {
    await prisma.employee.update({
      where: {
        id: values.id,
      },
      data: {
        ...values,
      },
    });

    revalidatePath("/admin/employee", "page");
    return { status: true, message: "Updated successfully" };
    revalidatePath("/admin/employee", "page");
    return { status: true, message: "Updated successfully" };
  } catch (err: Error | unknown) {
    const error = err instanceof Error ? err.message : "Internal server error";

    return { status: false, error: error };
  }
};

export const updateUser = async (values: UserSchemaType) => {
  try {
    await prisma.user.update({
      where: {
        email: values.email,
      },
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      },
    });

    return { status: true, message: "Updated successfully" };
  } catch (err: Error | unknown) {
    const error = err instanceof Error ? err.message : "Internal Server Error";
    return { status: false, error: error };
  }
};

export const updatePayrollDetails = async (
  values: UpdatePayrollDetailsSchemaType,
) => {
  try {
    await prisma.payroll.update({
      where: {
        id: values.id,
      },
      data: {
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
      },
    });
    revalidatePath("/admin/payroll", "page");
    return { status: true, message: "Payroll updated" };
  } catch (err: Error | unknown) {
    const error = err instanceof Error ? err.message : "internal Server Error";

    return { status: false, error: error };
  }
};
