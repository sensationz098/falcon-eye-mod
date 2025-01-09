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

export const getAllEmployee = async () => {
  return await prisma.employee.findMany({
    select: {
      id: true,
      employee_id: true,
      name: true,
      email: true,
      primary_contact: true,
      designation: true,
      department: true,
      employement_type: true,
      userID: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getEmployeeById = async (_id: string) => {
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

export const getAllPayroll = async () => {
  return await prisma.payroll.findMany({
    select: {
      id: true,
      basic_salary: true,
      convenience: true,
      deducation: true,
      gross_salary: true,
      HRA: true,
      medical: true,
      net_salary: true,
      other_allowences: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
