import prisma from "./prisma";

export const getUserProfile = async ({ _id }: { _id: string }) => {
  return await prisma.user.findFirst({
    where: {
      id: _id,
    },
    include: {
      Employee: true,
      payroll: true,
      bank: true,
    },
  });
};

export const getAllWorkReport = async ({
  _id,
  type,
}: {
  _id: string;
  type: "ALL" | "THREE";
}) => {
  if (type === "THREE") {
    return await prisma.workReport.findMany({
      where: {
        userID: _id,
      },
      select: {
        id: true,
        work: true,
        updated_At: true,
      },
      orderBy: {
        updated_At: "desc",
      },
      take: 3,
    });
  }

  return await prisma.workReport.findMany({
    where: {
      userID: _id,
    },
    select: {
      id: true,
      work: true,
      updated_At: true,
    },
    orderBy: {
      updated_At: "desc",
    },
  });
};

export const getLeaveRequests = async ({
  _id,
  type,
}: {
  _id: string;
  type: "ALL" | "THREE";
}) => {
  if (type === "THREE") {
    return await prisma.leaveRequest.findMany({
      where: {
        userID: _id,
      },
      orderBy: {
        created_At: "asc",
      },
      take: 3,
    });
  }

  return await prisma.leaveRequest.findMany({
    where: {
      userID: _id,
    },
    orderBy: {
      created_At: "asc",
    },
  });
};

export const getUserHeader = async (_id: string) => {
  return await prisma.employee.findFirst({
    where: {
      userID: _id,
    },
    select: {
      name: true,
      department: true,
      designation: true,
      date_of_joining: true,
    },
  });
};
