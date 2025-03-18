"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variant";

const HeroSection = () => {
  return (
    <section className="container py-10 font-roboto ">
      <div className="grid grid-cols-1 lg:grid-cols-2  items-center justify-center pt-[13vh]">
        <div className="flex-1">
          <motion.h1
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="h1"
          >
            Explore the Finest Global Offers
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="text-[16px] sm:text-[20px] sm:text-center lg:text-left text-gray-600 mt-30px description max-w-[550px] mx-auto xl:mx-0 xl:mb-10"
          >
            Find your ideal ride for any adventure with our diverse range of
            affordable and dependable car rentals
          </motion.p>
          <motion.div
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="mt-[20px]  md:mt-[60px] flex flex-row sm:items-center sm:justify-center lg:items-start lg:justify-start gap-5"
          >
            <button className="btn-cta">
              <Image src={"/google-play.svg"} alt="" width={132} height={36} />
            </button>
            <button className="btn-cta">
              <Image src={"/app-store.svg"} alt="" width={132} height={36} />
            </button>
          </motion.div>
        </div>
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="relative md:h-[600px] h-[300px]"
        >
          <Image src={"/car.svg"} alt="" fill />
          {/* <Image src={"/lexus1.png"} alt="" fill /> */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
