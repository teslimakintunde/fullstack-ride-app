"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { MdHandshake, MdKey, MdTrendingUp } from "react-icons/md";
import { fadeIn } from "../../../variant";

const Objectives = () => {
  return (
    <section
      className="section flex items-center bg-white my-[30px] md:my-[60px] lg:my-[100px]"
      id="why"
    >
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          animate="show"
          // viewport={{ once: true }}
          className="h2 text-center"
        >
          Unmatched excellence and customer satisfaction
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="max-w-[680px] text-center mx-auto mb-2"
        >
          Our dedication to providing exceptional services sets us apart from
          the competition. From the moment you engage with us, we strive to
          exceed your expectations in every interaction.
        </motion.p>
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="hidden md:flex justify-center mb-6 xl:mb-2"
        >
          <Image src={"/car-p.png"} alt="" width={1060} height={420} />
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="flex flex-col my-10 sm:my-16   sm:grid sm:grid-cols-2 justify-center xl:grid xl:grid-cols-3 gap-4 xl:gap-y-0 xl:gap-x-[30px]"
        >
          {/*  */}
          <div className="flex flex-col  bg-white shadow-md items-center text-center  xl:max-w-none  xl:p-0">
            <MdKey className="text-[38px] text-black mb-4" />
            <h3 className="h3">Rent simply and quickly</h3>
            <p className=" xl:flex p-4">
              We priotize your need and we go above and beyond to ensure your
              experiance with us is nothing short of outstanding.
            </p>
          </div>
          {/*  */}
          <div className="flex flex-col bg-white shadow-md items-center text-center xl:max-w-none p-2 xl:p-0">
            <MdTrendingUp className="text-[38px] text-balck mb-4" />
            <h3 className="h3">Modern $ well maintained vehicles</h3>
            <p className=" xl:flex p-4">
              We priotize your need and we go above and beyond to ensure your
              experiance with us is nothing short of outstanding.
            </p>
          </div>
          {/*  */}
          <div className="flex flex-col bg-white shadow-md items-center text-center xl:max-w-none p-2 xl:p-0">
            <MdHandshake className="text-[38px] text-black mb-4" />
            <h3 className="h3">Prompt and flexible services </h3>
            <p className=" xl:flex p-4">
              We priotize your need and we go above and beyond to ensure your
              experiance with us is nothing short of outstanding.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Objectives;
