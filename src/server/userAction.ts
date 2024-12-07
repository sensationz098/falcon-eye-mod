"use server";
import prisma from "@/db/prisma";
import { UserSchemaType } from "@/types";
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
