import { ArrowRight } from "lucide-react";
import HeroImages from "./HeroImages";

import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  return (
    <section
      ref={heroRef}
      className="overflow-x-clip bg-gradient-to-t from-blue-500 to-white/20 pb-20 pt-8 md:pb-10 md:pt-5"
    >
      <div className="container px-4 md:px-0">
        <div className="items-center md:flex">
          <div className="md:ml-6 md:w-[478px] lg:ml-20">
            <div className="tag">version 1.0 is here</div>
            <h1 className="mt-6 bg-gradient-to-b from-black to-[#001E80] bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl">
              Pathway to Productivity
            </h1>
            <p className="mt-6 text-xl tracking-tight text-[#010D3E]">
              Celebrate the joy of accomplashimnet with an app designed to track
              your progress, motivate your efforts, and celebrate your success.
            </p>
            <div className="item-center mt-[30px] flex gap-1">
              <button className="btn btn-primary">Get For Free</button>
              <button className="btn btn-text gap-1">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="relative mt-20 md:mt-0 md:h-[648px] md:flex-1">
            <HeroImages />
          </div>
        </div>
      </div>
    </section>
  );
};
