import { auth } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { sendOrderConfirmationEmail } from "@/utils/sendEmail";
import { NextResponse } from "next/server";
import { CustomLocation } from "../../../../types";

//Define the Location type

export async function POST(req: Request) {
  const session = await auth();
  try {
    const body = await req.json();
    console.log("Received Order Data:", body);

    if (!body.userEmail || !body.title || !body.startDate || !body.endDate) {
      console.error("Missing Fields:", {
        userEmail: body.userEmail,
        title: body.title,
        startDate: body.startDate,
        endDate: body.endDate,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert values to proper types
    const orderData = {
      imgUrl: body.imgUrl || "",
      title: body.title,
      desc: body.desc || "",
      price: Number(body.price) || 0,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      pickupTime: body.pickupTime || "",
      persons: Number(body.persons) || 1,
      pickupLocation: body.pickupLocation || { address: "Unknown" }, // Keep as JSON
      destinationLocation: body.destinationLocation || { address: "Unknown" }, // Keep as JSON
      userEmail: session?.user?.email || body.email,
      carSlug: body.carSlug || "default-slug",
      comment: body.comment || "",
      phoneNumber: body.phoneNumber || "",
    };

    const order = await prisma.order.create({
      data: orderData,
    });

    console.log("Order created successfully:", order);

    // Parse pickupLocation and destinationLocation to CustomLocation
    const parsedOrder = {
      ...order,
      pickupLocation: order.pickupLocation
        ? (JSON.parse(JSON.stringify(order.pickupLocation)) as CustomLocation)
        : null,
      destinationLocation: order.destinationLocation
        ? (JSON.parse(
            JSON.stringify(order.destinationLocation)
          ) as CustomLocation)
        : null,
    };

    // Send confirmation email
    await sendOrderConfirmationEmail(body.userEmail, parsedOrder);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  const session = await auth();
  if (!session || !session?.user?.email) {
    return NextResponse.json({ error: "unauthprized" }, { status: 401 });
  }

  try {
    const orderHistory = await prisma.order.findMany({
      where: { userEmail: session?.user.email },
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(orderHistory, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
