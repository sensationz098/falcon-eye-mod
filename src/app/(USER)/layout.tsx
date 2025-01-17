import { Navbar } from "@/components";
import { ReactNode } from "react";
import { UserNavbarProps } from "@/constant";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ReactMarquee from "@/components/UserMarquee";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactMarquee />
      <Navbar navbarProps={UserNavbarProps} />
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </>
  );
}
