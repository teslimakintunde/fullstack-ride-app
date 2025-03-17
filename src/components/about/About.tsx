"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variant";

const AboutUs = () => {
  return (
    <section className="container -mt-[30px]">
      <div className="flex flex-col-reverse lg:flex-row gap-5 py-[30px]  lg:pt-[60px]">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="relative h-[300px] lg:flex-1 lg:[w-60%]"
        >
          <Image src={"/lexus1.png"} alt="" fill className="object-contain" />
        </motion.div>
        <div className="lg:w-[45%] w-full sm:text-center lg:text-left">
          <motion.h2
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-7"
          >
            About Us
          </motion.h2>
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="text-[18px] flex flex-col  gap-4"
          >
            <p>
              Looking for a reliable and affordable way to get around? Rent a
              car from us! Whether you need a sleek sedan for city driving, a
              spacious SUV for family trips, or a rugged vehicle for off-road
              adventures, we’ve got you covered.
            </p>
            <p>
              Our fleet is well-maintained, modern, and ready to take you
              wherever you need to go. With flexible rental options, competitive
              prices, and excellent customer service, your journey starts here.
              Book now and enjoy the freedom of the open road! 🚗✨
            </p>
          </motion.div>
          <motion.button
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="px-6 py-2 bg-red-500 rounded-sm text-white font-medium mt-7"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
