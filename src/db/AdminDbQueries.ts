"use server";

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

export const getUser = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
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

      gross_salary: true,

      net_salary: true,

      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getAllLeaveRequest = async () => {
  return await prisma.leaveRequest.findMany({
    select: {
      id: true,
      emp_name: true,
      start_date: true,
      end_date: true,
      leave_type: true,
      created_At: true,
      reason: true,
      approval: true,
    },
  });
};

export const getStatsCard = async () => {
  const totalEmployee = await prisma.employee.count();
  const totalUsers = await prisma.user.count();
  const totalBranches = await prisma.employee.findMany({
    distinct: ["branch"],
    select: {
      branch: true,
    },
  });

  return { totalEmployee, totalUsers, totalBranches };
};

export const getHolidays = async () => {
  return await prisma.holiday.findMany();
};

export const upcomingBirthdays = async () => {
  const birthday = await prisma.employee.findMany({
    select: {
      id: true,
      name: true,
      date_of_birth: true,
    },
  });
  const currentMonth = new Date().getMonth();
  const filteredByMonth = birthday.filter((i) => {
    const filterMonth = i.date_of_birth?.getMonth();
    return filterMonth === currentMonth;
  });
  return filteredByMonth;
};

export const totalDepartmentChart = async () => {
  const department = await prisma.employee.groupBy({
    by: ["department"],
    _count: {
      department: true,
    },
  });

  const dep = department.map((i) => {
    return {
      name: i.department,
      count: i._count.department,
    };
  });
  return dep;
};
