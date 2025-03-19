// import { prisma } from "@/utils/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const pickupDate = searchParams.get("pickupDate");

//     if (!pickupDate) {
//       return NextResponse.json(
//         { message: "Pickup date is required" },
//         { status: 400 }
//       );
//     }

//     // Convert pickupDate to a valid Date object
//     const formattedDate = new Date(pickupDate);
//     // if (isNaN(formattedDate)) {
//     //   return NextResponse.json(
//     //     { message: "Invalid date format" },
//     //     { status: 400 }
//     //   );
//     // }
//     if (isNaN(formattedDate.getTime())) {
//       // Check if the date is invalid
//       return NextResponse.json(
//         { message: "Invalid date format" },
//         { status: 400 }
//       );
//     }

//     const existingBooking = await prisma.order.findFirst({
//       where: {
//         pickupDate: formattedDate, // Prisma expects a Date object
//       },
//     });

//     return NextResponse.json({ booked: !!existingBooking });
//   } catch (error) {
//     console.error("Error checking booking:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }

// import { prisma } from "@/utils/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const startDateStr = searchParams.get("startDate");
//     const endDateStr = searchParams.get("endDate");

//     if (!startDateStr || !endDateStr) {
//       return NextResponse.json(
//         { message: "Start date and end date are required" },
//         { status: 400 }
//       );
//     }

//     const startDate = new Date(startDateStr);
//     const endDate = new Date(endDateStr);

//     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//       return NextResponse.json(
//         { message: "Invalid date format" },
//         { status: 400 }
//       );
//     }

//     // Check for overlapping bookings
//     const existingBooking = await prisma.order.findFirst({
//       where: {
//         OR: [
//           {
//             startDate: { lte: endDate },
//             endDate: { gte: startDate },
//           },
//         ],
//       },
//     });

//     return NextResponse.json({ booked: !!existingBooking });
//   } catch (error) {
//     console.error("Error checking booking:", error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }

import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");

    if (!startDateStr || !endDateStr) {
      return NextResponse.json(
        { message: "Start date and end date are required" },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format" },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const existingBooking = await prisma.order.findFirst({
      where: {
        OR: [
          {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
    });

    return NextResponse.json({ booked: !!existingBooking });
  } catch (error) {
    console.error("Error checking booking:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
