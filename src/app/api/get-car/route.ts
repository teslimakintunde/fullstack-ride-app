import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const carPost = await prisma.car.findMany();
    return NextResponse.json(carPost, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
};
