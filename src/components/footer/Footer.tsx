"use client";

import { FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeIn } from "../../../variant";
import CopyRIght from "../copy-right/CopyRight";

const Footer = () => {
  return (
    <footer className="pt-20 md:pt-50 bg-white z-20 mt-auto" id="contact">
      <div className="container mx-auto mb-24">
        {/* grid */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }} // Ensures it animates only once and stays visible
          className="flex flex-col lg:flex-row lg:justify-between gap-x-5 gap-y-14"
        >
          <div className="flex flex-col flex-1 gap-y-8">
            <Link href={"/"}>
              <span className="text-3xl font-bold">CarRental</span>
            </Link>
            <div className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quo
              sapiente ipsum pariatur delectus quasi!
            </div>
            {/* phone and email */}
            <div className="flex flex-col gap-y-4 font-semibold">
              <div className="flex items-center gap-x-[10px]">
                <FaPhone />
                <div className="font-medium">(123)456-789</div>
              </div>
              <div className="flex items-center gap-x-[10px]">
                <FaEnvelope />
                <div>office@carland.com</div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col xl:items-center">
            <div>
              <h3 className="h3 font-bold mb-8">Company</h3>
              <ul className="flex flex-col gap-y-4 font-semibold">
                <li>
                  <a href="">New York</a>
                </li>
                <li>
                  <a href="">Creers</a>
                </li>
                <li>
                  <a href="">Mobile</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
                <li>
                  <a href="">How we work</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="h3 font-bold mb-8">Working Hours</h3>
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-2">
                <div className="text-balck">Mon-Fri:</div>
                <div className="font-semibold text-gray-600">
                  09:00AM-09:00PM
                </div>
              </div>
              <div className="flex gap-x-2">
                <div className="text-black">Sat:</div>
                <div className="font-semibold text-gray-600">
                  09:00AM-07:00PM
                </div>
              </div>
              <div className="flex gap-x-2">
                <div className="text-black">Sun:</div>
                <div className="font-semibold text-gray-600">Closed</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="h3 font-bold mb-8">Newsletter</h3>
            <div className="mb-9 text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laboriosam?
            </div>
            <form className="flex gap-x-2">
              <input
                type="text"
                placeholder="Your email"
                className="outline p-3 bg-white h-full border rounded-lg  focus:border-accent"
              />
              <button
                className="px-4 py-2 bg-red-400 text-white font-medium rounded-sm"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </motion.div>
      </div>
      <CopyRIght />
    </footer>
  );
};

export default Footer;
