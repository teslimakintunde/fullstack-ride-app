"use client";

import NavMenu from "./NavMenu";
import { useEffect, useState } from "react";

// Define the type for the session object
interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  expires?: string;
}

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const data = await res.json();
      setSession(data);
    };
    fetchSession();
  }, []);

  return (
    <header className="w-full fixed z-50 top-0 left-0 bg-white shadow-md ">
      <nav className="container py-3 ">
        <NavMenu session={session} />
      </nav>
    </header>
  );
};

export default Navbar;
