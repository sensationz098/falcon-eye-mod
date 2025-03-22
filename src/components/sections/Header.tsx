"use client";
import { ArrowRight } from "lucide-react";
import Logo1 from "@/assets/falcon1-logo.png";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm" id="header">
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

            {/* hamburger icon */}

            <nav className="items-center gap-6 text-black/60 md:flex">
              <ScrollLink
                to="home"
                smooth={true}
                offset={-5000}
                duration={500}
                className="hidden cursor-pointer md:block"
              >
                Home
              </ScrollLink>

              <ScrollLink
                to="product"
                smooth={true}
                offset={-100}
                duration={500}
                className="hidden cursor-pointer md:block"
              >
                How to use
              </ScrollLink>

              <ScrollLink
                to="testimonials"
                smooth={true}
                offset={-40}
                duration={500}
                className="hidden cursor-pointer md:block"
              >
                Reviews
              </ScrollLink>
              <ScrollLink
                to="footer"
                smooth={true}
                offset={100}
                duration={500}
                className="hidden cursor-pointer md:block"
              >
                Help
              </ScrollLink>

              <Link href="/user" className="btn btn-primary">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
