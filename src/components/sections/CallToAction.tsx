import { ArrowRight } from "lucide-react";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion } from "motion/react";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <section className="overflow-x-clip bg-gradient-to-b from-white to-[#D2DCFF] p-2 py-24">
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Sign up for free</h2>
          <p className="section-description mt-5">
            Celebrate the joy of accomplishment with an app designed to track
            your progress and motivate your efforts
          </p>
          <motion.img
            src={starImage.src}
            alt="Star Image"
            className="absolute -left-8 -top-4 w-20 md:-left-32 md:-top-6 md:w-36 lg:-left-[400px] lg:-top-6 lg:w-[200px]"
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
            className="absolute -bottom-36 -right-6 w-24 md:-bottom-36 md:-right-32 md:w-36 lg:-bottom-[180px] lg:-right-[400px] lg:w-[200px]"
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
        <div className="mt-10 flex justify-center gap-2">
          <Link href={"/admin"}>
            <button className="btn btn-primary">Go to Admin</button>
          </Link>
          <span>Learn More</span>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
};
