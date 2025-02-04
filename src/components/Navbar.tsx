import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { Button } from "./ui/button";
import Link from "next/link";
import type { NavbarPropsType } from "@/constant";

const Navbar = ({ navbarProps }: { navbarProps: NavbarPropsType[] }) => {
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
          {navbarProps.map((i, index) => {
            return (
              <Link key={index} href={i.url}>
                <Button className="rounded-xl bg-blue-500 text-center text-white">
                  {i.title} <i.Icon />
                </Button>
              </Link>
            );
          })}
          <div className="">
            <AuthButtons />
          </div>
        </nav>
      </div>
      <div className="">
        <AuthButtons />
      </div>
    </header>
  );
};

export default Navbar;
