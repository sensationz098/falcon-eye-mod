import { Calendar, Home, Inbox, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./ADMIN/LogoutButton";

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

const Navbar = async () => {
  return (
    <header className="flex flex-col items-center gap-5 p-4 md:flex-row md:justify-between md:gap-2">
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <div className="flex items-center justify-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={50} height={50} />
          <h1 className="text-center text-xl text-white">
            Falcon <span className="text-primary">EYE</span> EMS
          </h1>
        </div>

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

      <div className="">
        <LogoutButton />
      </div>
    </header>
  );
};

export default Navbar;
