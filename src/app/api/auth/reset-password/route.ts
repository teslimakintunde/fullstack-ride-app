import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/utils/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();
    console.log("Received token:", token);
    console.log("Received new password:", newPassword);

    if (!token || !newPassword) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Verify token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log("Decoded token payload:", decoded);
    } catch (error) {
      console.log("JWT verification error:", error);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const userId = decoded.userId as string;
    console.log("Extracted userId from token:", userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 }
      );
    }

    // Find the user by ID
    let user;
    try {
      user = await prisma.user.findUnique({ where: { id: userId } });
      console.log("Found user:", user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    console.log("Generated Hashed Password:", hashedPassword);

    // Update user password
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      const updatedUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      console.log("Stored Password Hash in DB:", updatedUser?.password);
    } catch (error) {
      console.error("Error updating password:", error);
    }

    // Delete all active sessions
    try {
      const sessionsBefore = await prisma.session.findMany({
        where: { userId },
      });
      console.log("Active sessions before deletion:", sessionsBefore);

      await prisma.session.deleteMany({ where: { userId } });
      console.log("Deleted old sessions for user:", userId);

      const sessionsAfter = await prisma.session.findMany({
        where: { userId },
      });
      console.log("Active sessions after deletion:", sessionsAfter);
    } catch (error) {
      console.error("Error deleting sessions:", error);
    }

    return NextResponse.json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
