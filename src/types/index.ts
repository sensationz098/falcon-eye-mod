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
  date_of_birth: z.string(),
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
