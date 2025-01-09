import { LucideIcon } from "lucide-react";
import { Home, Calendar } from "lucide-react";

export type NavbarPropsType = {
  title: string;
  url: string;
  Icon: LucideIcon;
};

export const AdminNavbarProps: NavbarPropsType[] = [
  { title: "Home", url: "/admin", Icon: Home },
  { title: "User", url: "/admin/user", Icon: Home },
  { title: "Employee", url: "/admin/employee", Icon: Calendar },
  { title: "Payroll", url: "/admin/payroll", Icon: Calendar },
  { title: "Leave Request", url: "/admin/leave-request", Icon: Calendar },
  { title: "Attendece", url: "/admin/attendence", Icon: Calendar },
];

export const IndianStates: Readonly<string[]> = [
  "New Delhi",
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
