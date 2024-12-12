import { Home, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import LogoutButton from "../ADMIN/LogoutButton";
import Image from "next/image";
import { getSession } from "@/lib/utils";

type UserNavbarType = {
  title: string;
  url: string;
  icon: LucideIcon;
}[];

const items: UserNavbarType = [
  { title: "Home", url: "/user", icon: Home },
  { title: "Profile", url: "/user/profile", icon: Home },
  { title: "Work Report", url: "/user/work-report", icon: Home },
];

const UserNavbar = async () => {
  const session = await getSession();

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

      <div className="">{session && <LogoutButton />}</div>
    </header>
  );
};

export default UserNavbar;
