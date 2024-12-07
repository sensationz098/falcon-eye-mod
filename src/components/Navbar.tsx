import { Calendar, Home, Inbox, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const items: {
  title: string;
  icon: LucideIcon;
  url: string;
}[] = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: Inbox,
  },
  {
    title: "Employee",
    url: "/admin/employee",
    icon: Inbox,
  },
  {
    title: "Payroll",
    url: "/admin/payroll",
    icon: Calendar,
  },
];

const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <h1 className="text-center text-xl text-blue-500 md:text-red-400">
          Falcon EYE EMS
        </h1>

        <nav className="flex flex-wrap items-center gap-2">
          {items.map((i) => {
            return (
              <Link key={i.title} href={i.url}>
                <Button className="text-center">
                  {i.title} <i.icon />
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;
