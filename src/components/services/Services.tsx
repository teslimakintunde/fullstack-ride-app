"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variant";
import {
  MdOutlineBuildCircle,
  MdOutlineDirectionsCar,
  MdOutlineMapsHomeWork,
} from "react-icons/md";

import Image from "next/image";
import { useState } from "react";

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true, // Ensures it triggers only once
  });

  const [hasCounted, setHasCounted] = useState(false);

  // Start counting when inView is true
  if (inView && !hasCounted) {
    setHasCounted(true);
  }
  return (
    <section className="container">
      <section
        className="section flex items-center bg-white md:py-[80px] py-[30px]  "
        ref={ref}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="flex-1 flex items-center xl:justify-center">
              <div className="xl:max-w-[517px]">
                <motion.h2
                  variants={fadeIn("up", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true }} // Ensures it animates only once and stays visible
                  className="h2"
                >
                  Car services simplified
                </motion.h2>
                <motion.p
                  variants={fadeIn("up", 0.6)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true }} // Ensures it animates only once and stays visible
                  className="mb-[42px] max-w-md"
                >
                  Rent, choose, and repair ease. Our convenient locations,
                  diverse car types, and relaible repair points ensure a
                  seamless car experience
                </motion.p>
                <motion.div
                  variants={fadeIn("up", 0.8)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true }} // Ensures it animates only once and stays visible
                  className="flex items-center gap-x-8 mb-12"
                >
                  {/*  */}
                  <div className="flex-1 flex flex-col max-w-[100px]">
                    <MdOutlineDirectionsCar className="text-5xl text-black" />
                    <div className="text-3xl font-black mb-2">
                      {hasCounted ? (
                        <CountUp start={0} end={50} duration={3} delay={1} />
                      ) : null}
                    </div>
                    <div className="uppercase text-[13px] font-semibold text-balck">
                      car <br />
                      types
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex-1 flex flex-col max-w-[100px]">
                    <MdOutlineMapsHomeWork className="text-5xl text-gray-600" />
                    <div className="text-3xl font-black mb-2">
                      {hasCounted ? (
                        <CountUp start={0} end={135} duration={3} delay={1} />
                      ) : null}
                    </div>
                    <div className="uppercase text-[13px] font-semibold text-black">
                      rental <br />
                      outlets
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex-1 flex flex-col max-w-[100px]">
                    <MdOutlineBuildCircle className="text-5xl text-gray-600" />
                    <div className="text-3xl font-black mb-2">
                      {hasCounted ? (
                        <CountUp start={0} end={35} duration={3} delay={1} />
                      ) : null}
                    </div>
                    <div className="uppercase text-[13px] font-semibold text-black">
                      repair <br />
                      points
                    </div>
                  </div>
                </motion.div>
                <motion.button
                  variants={fadeIn("up", 1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true }} // Ensures it animates only once and stays visible
                  className="hidden xl:block bg-red-500 hover:bg-accent-hover rounded-[10px] w-full h-16 uppercase font-medium text-medium text-white tracking-[2px] text-[13px] max-w-[184px]"
                >
                  See all cars
                </motion.button>
              </div>
            </div>
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }} // Ensures it animates only once and stays visible
              className="flex-1 mb-8 xl:mb-8"
            >
              <Image
                className="rounded-[20px]"
                src={"/car01.png"}
                width={600}
                height={448}
                alt=""
              />
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Services;
