import prisma from "./prisma";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      created_At: true,
    },
  });
};
