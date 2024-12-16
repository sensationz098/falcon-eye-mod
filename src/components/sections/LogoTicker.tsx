import typeScript_ from "@/assets/TechStack/type.png";
import tailwind_ from "@/assets/TechStack/tailwind.png";
import nextjs_ from "@/assets/TechStack/nextjs.png";
import motion_ from "@/assets/TechStack/motion.png";
import mongo_ from "@/assets/TechStack/mongo.png";
import prisma_ from "@/assets/TechStack/prisma.png";
import shad_ from "@/assets/TechStack/shad.png";

import { motion } from "motion/react";

import Image from "next/image";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden masking-effect">
          <motion.div
            className="flex gap-32 flex-none w-full justify-around "
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <Image src={typeScript_} alt="" className="logo-ticker-image" />
            <Image src={tailwind_} alt="" className="logo-ticker-image" />
            <Image src={nextjs_} alt="" className="logo-ticker-image" />
            <Image src={motion_} alt="" className="logo-ticker-image" />
            <Image src={mongo_} alt="" className="logo-ticker-image" />
            <Image src={prisma_} alt="" className="logo-ticker-image" />
            <Image src={shad_} alt="" className="logo-ticker-image" />

            {/* second set of logos for animation */}
            <Image src={typeScript_} alt="" className="logo-ticker-image" />
            <Image src={tailwind_} alt="" className="logo-ticker-image" />
            <Image src={nextjs_} alt="" className="logo-ticker-image" />
            <Image src={motion_} alt="" className="logo-ticker-image" />
            <Image src={mongo_} alt="" className="logo-ticker-image" />
            <Image src={prisma_} alt="" className="logo-ticker-image" />
            <Image src={shad_} alt="" className="logo-ticker-image" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
