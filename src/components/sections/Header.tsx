"use client";
import { ArrowRight, AlignJustify } from "lucide-react";
import Logo1 from "@/assets/falcon1-logo.png";
// import Home from "./Home";
// import { Link as RouterLink } from "react-router-dom";
import Link from "next/link";

import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  const [isClick, setIsClick] = useState(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
    console.log("toggle navbar", isClick);
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm" id="header">
      {/* sidebar component */}
    
      {/* sidebar component */}
      <div className="relative flex items-center justify-center gap-3 bg-black py-3 text-sm text-white">
        <p className="hidden text-white/60 md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex items-center gap-1">
          <p>Get Started for free</p>
          <ArrowRight className="inline-flex h-4 items-center justify-center" />
        </div>
      </div>
      <div className="bg-white/20 py-5">
        <div className="container px-4 md:px-0">
          <div className="flex items-center justify-between">
            <Image src={Logo1} alt="" className="w-16 md:w-[80]" />

            {/* hamburger icon */}
            <AlignJustify
              className={`hamburger z-50 h-7 w-8 rounded-sm md:hidden ${
                isClick ? "isActive" : "isinActive"
              }`}
              onClick={toggleNavbar}
            />
            {/* hamburger icon */}

            <nav className="hidden items-center gap-6 text-black/60 md:flex">
              {/* <RouterLink to="/home">Go to Home Section</RouterLink> */}

              <ScrollLink
                to="/Home"
                smooth={true}
                offset={-5000}
                duration={500}
              >
                Home
              </ScrollLink>

              <ScrollLink
                to="product"
                smooth={true}
                offset={-100}
                duration={500}
              >
                How to use
              </ScrollLink>
              <ScrollLink
                to="pricing"
                smooth={true}
                offset={-100}
                duration={500}
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="testimonials"
                smooth={true}
                offset={-40}
                duration={500}
              >
                Reviews
              </ScrollLink>
              <ScrollLink to="footer" smooth={true} offset={100} duration={500}>
                Help
              </ScrollLink>

              <Link href="/api/auth/signin" className="btn btn-primary">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
