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
