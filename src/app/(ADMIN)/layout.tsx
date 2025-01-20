import { Navbar } from "@/components";
import { ReactNode } from "react";
import { AdminNavbarProps } from "@/constant";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar navbarProps={AdminNavbarProps} />
      <div className="mx-20">{children}</div>
    </>
  );
}
