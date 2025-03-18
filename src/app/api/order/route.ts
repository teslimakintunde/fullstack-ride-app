import { auth } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { sendOrderConfirmationEmail } from "@/utils/sendEmail";
import { NextResponse } from "next/server";
import { CustomLocation } from "../../../../types";

// export async function POST(req: Request) {
//   const session = await auth();
//   try {
//     const body = await req.json();
//     console.log("Received Order Data:", body); // Debugging

//     // Validate required fields
//     if (!body.userEmail || !body.title || !body.pickupDate) {
//       console.error("Missing Fields:", {
//         userEmail: body.userEmail,
//         title: body.title,
//         pickupDate: body.pickupDate,
//       });
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Test if email is working
//     // const transporter = nodemailer.createTransport({
//     //   service: "Gmail",
//     //   auth: {
//     //     user: process.env.EMAIL_USER,
//     //     pass: process.env.EMAIL_PASS,
//     //   },
//     // });

//     // const testEmail = await transporter.sendMail({
//     //   from: process.env.EMAIL_USER,
//     //   to: "your-email@gmail.com", // Replace with your email
//     //   subject: "Test Email ✅",
//     //   text: "If you received this email, then Nodemailer is working!",
//     // });

//     // console.log("✅ Test email response:", testEmail.response);

//     // Convert values to proper types
//     const orderData = {
//       imgUrl: body.imgUrl || "",
//       title: body.title,
//       desc: body.desc || "",
//       price: Number(body.price) || 0,
//       pickupDate: new Date(body.pickupDate), // Ensure correct Date format
//       pickupTime: body.pickupTime || "",
//       persons: Number(body.persons) || 1, // Ensure it's a number
//       pickupLocation: body.pickupLocation || { address: "Unknown" }, // ✅ Keep as JSON
//       destinationLocation: body.destinationLocation || { address: "Unknown" }, // ✅ Keep as JSON
//       userEmail: session?.user?.email || body.email, // ✅ Ensure correct key name
//       carSlug: body.carSlug || "default-slug", // Avoid undefined errors
//       comment: body.comment || "",
//       phoneNumber: body.phoneNumber || "",
//     };

//     const order = await prisma.order.create({
//       data: orderData,
//     });

//     console.log("Order created successfully:", order);
//     // Send confirmation email
//     await sendOrderConfirmationEmail(body.userEmail, order);
//     return NextResponse.json(order, { status: 201 });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       { error: "Failed to create order" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: Request) {
//   const session = await auth();
//   try {
//     const body = await req.json();
//     console.log("Received Order Data:", body); // Debugging

//     // Validate required fields
//     if (!body.userEmail || !body.title || !body.pickupDate) {
//       console.error("Missing Fields:", {
//         userEmail: body.userEmail,
//         title: body.title,
//         pickupDate: body.pickupDate,
//       });
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Convert values to proper types
//     const orderData = {
//       imgUrl: body.imgUrl || "",
//       title: body.title,
//       desc: body.desc || "",
//       price: Number(body.price) || 0,
//       pickupDate: new Date(body.pickupDate), // Ensure correct Date format
//       pickupTime: body.pickupTime || "",
//       persons: Number(body.persons) || 1, // Ensure it's a number
//       pickupLocation: body.pickupLocation || { address: "Unknown" }, // ✅ Keep as JSON
//       destinationLocation: body.destinationLocation || { address: "Unknown" }, // ✅ Keep as JSON
//       userEmail: session?.user?.email || body.email, // ✅ Ensure correct key name
//       carSlug: body.carSlug || "default-slug", // Avoid undefined errors
//       comment: body.comment || "",
//       phoneNumber: body.phoneNumber || "",
//     };

//     const order = await prisma.order.create({
//       data: orderData,
//     });

//     console.log("Order created successfully:", order);
//     // Send confirmation email
//     await sendOrderConfirmationEmail(body.userEmail, order);
//     return NextResponse.json(order, { status: 201 });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       { error: "Failed to create order" },
//       { status: 500 }
//     );
//   }
// }

//Define the Location type

export async function POST(req: Request) {
  const session = await auth();
  try {
    const body = await req.json();
    console.log("Received Order Data:", body);

    // Validate required fields
    if (!body.userEmail || !body.title || !body.pickupDate) {
      console.error("Missing Fields:", {
        userEmail: body.userEmail,
        title: body.title,
        pickupDate: body.pickupDate,
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
      pickupDate: new Date(body.pickupDate),
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
      orderBy: { pickupDate: "desc" },
    });
    return NextResponse.json(orderHistory, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
