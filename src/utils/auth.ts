import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type User, type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt"; // Correctly import JWT type (suppress ESLint warning)
import { prisma } from "./prisma";

// Extend the User and Session types to include isAdmin
declare module "next-auth" {
  interface User {
    isAdmin?: boolean; // Add isAdmin without redefining id
  }

  interface Session extends DefaultSession {
    user?: {
      id: string; // Ensure id is always a string
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Ensure id is always a string
    isAdmin?: boolean;
  }
}

// Define the type for credentials
interface Credentials {
  email: string;
  password: string;
}

// Extend the User type to include isAdmin
interface CustomUser extends User {
  id: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

// Login function with TypeScript types
const login = async (credentials: Credentials): Promise<CustomUser> => {
  try {
    // Find user in Prisma database
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcryptjs.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    return user as CustomUser;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to login");
  }
};

// NextAuth configuration with TypeScript types
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials as Credentials);
          if (user) {
            return user; // If login is successful, return the user object
          }
          return null;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ensure user.id is a string before assigning it to token.id
        if (typeof user.id === "string") {
          token.id = user.id;
        } else {
          throw new Error("User ID is undefined");
        }
        token.isAdmin = (user as CustomUser).isAdmin ?? false; // Ensure isAdmin is included
      } else {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string }, // Ensure id is always a string
          select: { isAdmin: true }, // Fetch isAdmin from the database
        });

        token.isAdmin = dbUser?.isAdmin ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id as string, // Ensure id is always a string
          isAdmin: token.isAdmin as boolean,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page (optional)
  },
  secret: process.env.NEXTAUTH_SECRET,
});
