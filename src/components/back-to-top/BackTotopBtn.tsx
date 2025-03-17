"use client";
import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTopBtn = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${
        !isActive && "hidden"
      } fixed bg-red-400 hover:bg-red-500 w-12 h-12 right-8 bottom-11 cursor-pointer flex justify-center items-center text-white border-2 border-white rounded-full z-50 shadow-lg transition-all duration-300`}
    >
      <FaChevronUp className="text-xl" />
    </button>
  );
};

export default BackToTopBtn;
