"use client";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import AuthLinks from "../authLinks/AuthLinks";
import Link from "next/link";

// Define the type for the session prop
interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  expires?: string;
}

interface NavMenuProps {
  session: Session | null;
}

const NavMenu: React.FC<NavMenuProps> = ({ session }) => {
  const [open, setOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#mobile-menu") && open) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open]);
  return (
    <nav className="flex flex-row justify-between items-center">
      <Link href={"/"}>
        <span className="text-3xl font-bold">CarRental</span>
      </Link>
      <ul className="hidden md:flex flex-row gap-x-5 items-center">
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/booking"}>
          <li>Booking</li>
        </Link>
        <Link href={"/"}>
          <li>Why Us</li>
        </Link>
        <Link href={"/"}>
          <li>Testimonials</li>
        </Link>
        <Link href={"/"}>
          <li>Contact</li>
        </Link>
        <AuthLinks session={session} />
      </ul>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-3xl cursor-pointer z-[1001] relative border p-2 border-red-400"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 flex flex-col items-center pt-20 gap-6 z-[900]`}
      >
        <Link
          href={"/"}
          onClick={() => setOpen(false)}
          className="px-6 py-3 w-full text-center hover:bg-gray-200 transition duration-300"
        >
          Home
        </Link>
        <Link
          href={"/booking"}
          onClick={() => setOpen(false)}
          className="px-6 py-3 w-full text-center hover:bg-gray-200 transition duration-300"
        >
          Booking
        </Link>
        <Link
          href={"/"}
          onClick={() => setOpen(false)}
          className="px-6 py-3 w-full text-center hover:bg-gray-200 transition duration-300"
        >
          Why Us
        </Link>
        <Link
          href={"/"}
          onClick={() => setOpen(false)}
          className="px-6 py-3 w-full text-center hover:bg-gray-200 transition duration-300"
        >
          Testimonials
        </Link>
        <Link
          href={"/"}
          onClick={() => setOpen(false)}
          className="px-6 py-3 w-full text-center hover:bg-gray-200 transition duration-300"
        >
          Contact
        </Link>
        <AuthLinks session={session} />
      </div>
    </nav>
  );
};

export default NavMenu;
