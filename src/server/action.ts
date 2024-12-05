"use server";

import prisma from "@/db/prisma";
import { UserSchemaType, EmployeeSchemaType } from "@/types";
import { revalidatePath } from "next/cache";

export const AddUserAction = async (values: UserSchemaType) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: values.email },
    });
    if (user) return { status: false, error: "User already exists" };

    await prisma.user.create({ data: values });
    revalidatePath("/admin/user");

    return {
      status: true,
      message: "User created successfully",
    };
  } catch (err: unknown | Error) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "Something went wrong" };
  }
};

export const createEmployee = async (
  values: EmployeeSchemaType,
  id: string,
) => {
  try {
    const date = new Date(values.date_of_birth);

    await prisma.employee.create({
      data: {
        name: values.name,
        email: values.email,
        employee_id: values.employee_id,
        address: values.address,
        gender: values.gender,
        primary_contact: values.primary_contact,
        emergency_contact_1: values.emergency_contact_1,
        emergency_contact_2: values.emergency_contact_2,
        city: values.city,
        country: values.country,
        aadhar_card: values.aadhar_no,
        PAN_no: values.PAN_no,
        employement_type: values.employement_type,
        department: values.department,
        designation: values.designation,
        date_of_joining: values.date_of_joining,
        branch: values.branch,
        date_of_birth: date,
        userID: id,
      },
    });
    return {
      status: true,
      message: "Employee created successfully",
    };
  } catch (err: unknown | Error) {
    if (err instanceof Error) {
      return { status: false, error: err.message };
    }
    return { status: false, error: "Something went wrong" };
  }
};
