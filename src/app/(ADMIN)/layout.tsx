import { Navbar } from "@/components";
import { ReactNode } from "react";
import { AdminNavbarProps } from "@/constant";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar navbarProps={AdminNavbarProps} />
      <div className="w-full">
        <div className="mx-0 md:mx-10">{children}</div>
      </div>
    </>
  );
}
