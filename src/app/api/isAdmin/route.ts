import { auth } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  // If the user is not authenticated, return an error response
  if (!session?.user?.email) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized access" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    //Ensure required fields are present
    if (
      !body.slug ||
      !body.title ||
      !body.desc ||
      !body.passenger ||
      !body.price ||
      !body.imgUrl
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const carPost = await prisma.car.create({
      data: { ...body, userEmail: session?.user?.email },
    });
    if (carPost) {
      return new NextResponse(
        JSON.stringify({ success: true, data: carPost }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Error creating car:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to save data", error }),
      { status: 500 }
    );
  }
};
