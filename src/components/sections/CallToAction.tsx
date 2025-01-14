import { ArrowRight } from "lucide-react";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion } from "motion/react";

export const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip p-2">
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Sign up for free</h2>
          <p className="section-description mt-5 ">
            Celebrate the joy of accomplishment with an app designed to track
            your progress and motivate your efforts
          </p>
          <motion.img
            src={starImage.src}
            alt="Star Image"
            className="absolute w-20 -left-8 -top-4 md:w-36 md:-left-32 md:-top-6 
            lg:w-[200px] lg:-left-[400px] lg:-top-6"
            animate={{
              rotate: "360deg",
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 40,
            }}
          />
          <motion.img
            src={springImage.src}
            alt="spring Image"
            className="absolute w-24 -right-6 -bottom-36 md:w-36 md:-right-32 md:-bottom-36
            lg:w-[200px] lg:-right-[400px] lg:-bottom-[180px]"
            animate={{
              translateY: [-150, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 10,
            }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">Get for free</button>
          <button className="btn btn-text gap-1">
            <span>Learn More</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
