// import logo from "@/assets/falcon1-logo.png";
import logo from "@/assets/logo-white.png";
import Image from "next/image";
import Link from "next/link";

import { Instagram, Github } from "lucide-react";
export const Footer = () => {
  return (
    <footer
      className="bg-black text-[#BCBCBC] text-sm py-10 text-center"
      id="footer"
    >
      <div className="container">
        <div className="flex justify-center items-center flex-col">
          <Image src={logo} height={40} alt="" className="w-20" />
          {/* <span className="text-2xl">FALCON EYE</span> */}
        </div>
        <nav className="flex gap-2 items-center justify-center my-6 md:gap-10 md:text-lg">
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Features</Link>
          <Link href={"#"}>Customers</Link>
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>Help</Link>
          <Link href={"#"}>careers</Link>
        </nav>
        <div className="flex items-center justify-center my-6 gap-6 ">
          <span>
            <Instagram />
          </span>
          <span>
            <Github />
          </span>
        </div>
        <p>&copy; 2024 Your Company, Inc. All rights reserved</p>
      </div>
    </footer>
  );
};
