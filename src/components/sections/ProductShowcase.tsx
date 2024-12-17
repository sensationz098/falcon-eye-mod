import productImage from "@/assets/product-image.png";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import { motion } from "motion/react";

import Image from "next/image";

export const ProductShowcase = () => {
  return (
    <section
      className="bg-gradient-to-b from-[#ffffff] to-[#D2DCFF] py-24 overflow-x-clip"
      id="product"
    >
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center ">
            <div className="tag">Boost Your Productivity</div>
          </div>
          <h2 className="section-title mt-5">
            A more effective way to track your progress
          </h2>
          <p className="section-description mt-5">
            Effortlessly turn your ideas into fully functional, responsive, SaaS
            Website in just minutes with this template.
          </p>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center">
            <Image src={productImage} alt="" className="mt-10" width={900} />
          </div>
          <motion.img
            src={pyramidImage.src}
            alt=""
            // className="hidden md:block absolute -right-36 -top-32"
            className="absolute -top-2 -right-8 w-[6rem] md:w-[8rem] lg:w-[12rem] lg:-right-24"
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
            src={tubeImage.src}
            alt=""
            height={248}
            // className="hidden md:block absolute bottom-24 -left-36"
            className="absolute top-36 -left-12 w-[6rem] md:w-[8rem] md:top-[18rem] md:-left-10 lg:w-[12rem] lg:-left-24"
            animate={{
              rotate: "-360deg",
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 40,
            }}
          />
        </div>
      </div>
    </section>
  );
};
