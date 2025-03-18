import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"; // Import JWT

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log("Received password reset request for:", email);

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("JWT Secret:", process.env.JWT_SECRET);

    // ✅ Generate a JWT token instead of a random one
    const token = jwt.sign(
      { userId: user.id }, // Payload
      process.env.JWT_SECRET!, // Secret key
      { expiresIn: "1h" } // Expiry time
    );
    console.log("Generated reset token:", token);

    // Store the token in the database (updating if already exists)
    await prisma.passwordResetToken.upsert({
      where: { userId: user.id }, // ✅ Now userId is unique
      update: {
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1-hour expiry
      },
      create: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000),
      },
    });

    // Construct the reset password URL with the JWT token
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    console.log("Reset URL:", resetUrl);

    // Send email with the reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>If you did not request a password reset, please ignore this email.</p>`,
    });

    return NextResponse.json({
      message: "Reset password email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error in forgot-password API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
