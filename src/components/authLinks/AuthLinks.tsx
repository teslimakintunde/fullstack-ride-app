"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
// Define the type for the session prop
interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    isAdmin?: boolean; // Add isAdmin to the user object
  };
  expires?: string;
}

interface AuthLinksProps {
  session: Session | null;
}

const AuthLinks: React.FC<AuthLinksProps> = ({ session }) => {
  const { status } = useSession();

  return (
    <div>
      <div className="">
        {status === "unauthenticated" ? (
          <Link
            href={"/login"}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-sm"
          >
            Login
          </Link>
        ) : (
          <div className="flex flex-row justify-center items-center space-x-5">
            {session?.user?.isAdmin && <Link href={"/admin"}>Admin</Link>}
            <button
              className="hidden md:block px-4 py-2  text-white bg-red-600 rounded-md transition"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLinks;
