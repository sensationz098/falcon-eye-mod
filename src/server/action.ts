"use server";

import prisma from "@/db/prisma";
import { UserSchemaType } from "@/types";
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
