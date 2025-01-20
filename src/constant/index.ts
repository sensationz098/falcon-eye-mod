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
  { title: "Attendence", url: "/admin/attendence", Icon: Calendar },
  { title: "Holidays", url: "/admin/holidays", Icon: Calendar },
];

export const UserNavbarProps: NavbarPropsType[] = [
  { title: "Home", url: "/user", Icon: Home },
  { title: "Profile", url: "/user/profile", Icon: Home },
  { title: "Work Report", url: "/user/work-report", Icon: Home },
  { title: "Leave Request", url: "/user/leave-request", Icon: Home },
  { title: "Attendence", url: "/user/attendence", Icon: Home },
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

export const ETime_Office_Api_Url = [];
