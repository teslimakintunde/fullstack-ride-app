import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in Prisma
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json(
      { success: true, message: "User registration successful", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
};
