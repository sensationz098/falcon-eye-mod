import { Navbar } from "@/components";
import { ReactNode } from "react";
import { UserNavbarProps } from "@/constant";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar navbarProps={UserNavbarProps} />
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </>
  );
}
