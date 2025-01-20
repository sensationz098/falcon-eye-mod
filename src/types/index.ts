import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(30, "Name must be less than 30 characters long"),
  email: z.string().email().trim(),
  password: z.string().trim(),
  role: z.enum(["ADMIN", "USER"]).default("USER"),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const EmployeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(30, "Name must be less than 30 characters long"),
  email: z.string().email().trim(),
  employee_id: z
    .string()
    .trim()
    .min(2, "Employee ID must be at least 3 characters long"),
  address: z
    .string()
    .trim()
    .min(2, "Address must be at least 2 characters long"),
  gender: z.enum(["MALE", "FEMALE"]),
  date_of_birth: z.string().transform((val) => new Date(val)),
  primary_contact: z
    .string()
    .trim()
    .length(10, "Primary contact must be 10 digits long"),
  emergency_contact_1: z.string().trim().optional(),
  emergency_contact_2: z.string().trim().optional(),
  city: z.string().trim().default("New Delhi"),
  country: z.string().trim().default("India"),
  aadhar_no: z.string().trim().length(12, "Aadhar card must be 12 digits long"),
  PAN_no: z
    .string()
    .trim()
    .toUpperCase()
    .length(10, "PAN no must be 10 characters long"),
  branch: z.string().trim().default("New Delhi"),
  designation: z.string().trim(),
  department: z.string().trim(),
  date_of_joining: z.date(),
  employement_type: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
    "TEMPORARY",
    "CONTRACT",
  ]),
});

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;

export const UpdateEmployeeSchema = EmployeeSchema.extend({
  id: z.string(),
  userID: z.string(),
  created_At: z.date(),
  updated_At: z.date(),
});

export type UpdateEmployeeSchemaType = z.infer<typeof UpdateEmployeeSchema>;

export const CreateSalaySchema = z.object({
  basic_salary: z
    .string()
    .min(2, "the basic salary must be 2 digit long")
    .transform((val) => parseInt(val, 10)),
  HRA: z
    .string()
    .default("0")
    .transform((val) => parseInt(val, 10)),
  medical: z
    .string()
    .default("0")
    .transform((val) => parseInt(val, 10)),
  convenience: z
    .string()
    .default("0")
    .transform((val) => parseInt(val, 10)),
  other_allowences: z
    .string()
    .default("0")
    .transform((val) => parseInt(val, 10)),
  deducation: z
    .string()
    .default("0")
    .transform((val) => parseInt(val, 10)),
});

export type CreateSalarySchemaType = z.infer<typeof CreateSalaySchema>;

export const BankAccountSchema = z.object({
  account_holder_name: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, "Name must be at least 2 characters long"),
  account_no: z
    .string()
    .trim()
    .min(8, "Account no must be at least 8 characters long"),
  bank_name: z
    .string()
    .trim()
    .min(5, "Bank name must be at least 5 characters long"),
  branch: z.string().trim().min(2, "Branch must be at least 2 characters long"),
  IFSC_code: z
    .string()
    .trim()
    .toUpperCase()
    .min(8, "IFSC code must be at least 8 characters long"),
});

export type CreateBankAccountSchemaType = z.infer<typeof BankAccountSchema>;

export const CreateWorkReportSchema = z.object({
  updated_At: z.date().default(() => new Date(Date.now())),
  work: z.string().trim().min(2, "Report must be at least 2 characters long"),
});

export type CreateWorkReportType = z.infer<typeof CreateWorkReportSchema>;

export const LeaveRequestSchema = z.object({
  start_date: z.date(),
  end_date: z.date().optional(),
  reason: z.string().trim().min(2, "Reason must be at least 2 characters long"),
  leave_type: z.enum(["PAID", "SICK", "CASUAL", "MATERNITY", "SHORT", "OTHER"]),
  half_day: z.enum(["FIRST_HALF", "SECOND_HALF"]),
});

export type LeaveRequestSchemaType = z.infer<typeof LeaveRequestSchema>;

export const HolidaySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "the holiday title must be 3 characters long")
    .max(30, "only 30 character allowed")
    .toUpperCase(),
  message: z
    .string()
    .trim()
    .min(3, "the message should be 3 characters long")
    .max(50, "only 50 characters allowed"),
  holiday_date: z.date(),
});

export type HolidaySchemaType = z.infer<typeof HolidaySchema>;
