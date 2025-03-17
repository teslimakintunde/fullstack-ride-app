"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "../../../variant";

const Cta = () => {
  return (
    <div
      className="pt-10 sm:pt-24 flex items-end pb-0 bg-[#b2b7c2]/10 overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto">
        <div className="flex flex-col  xl:items-center md:flex-row-reverse">
          <div className="flex-1 xl:ml-24 text-center md:text-left mb-12 md:mb-8">
            <div className="max-w-[520px] mx-auto order-2 xl:order-none">
              <h2 className="h2">
                Download our App now and hit the road with ease
              </h2>
              <motion.p
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
                className="mb-10"
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
                amet dignissimos tempore velit vel hic similique maiores
                mollitia iure cupiditate?
              </motion.p>
              <motion.div
                variants={fadeIn("right", 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true }}
                className="flex gap-x-3 justify-center md:justify-start "
              >
                <button className="btn-cta">
                  <Image
                    src={"/google-play.svg"}
                    alt=""
                    width={132}
                    height={36}
                  />
                </button>
                <button className="btn-cta">
                  <Image
                    src={"/app-store.svg"}
                    alt=""
                    width={132}
                    height={36}
                  />
                </button>
              </motion.div>
            </div>
          </div>
          <motion.div
            variants={fadeIn("left", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="flex-1 flex justify-center order-1 md:order-none"
          >
            <Image src={"/phone.svg"} alt="" width={320} height={640} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
