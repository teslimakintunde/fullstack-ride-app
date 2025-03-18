import nodemailer from "nodemailer";
import { Order } from "../../types";

// export const sendOrderConfirmationEmail = async (
//   email: string,
//   order: Order
// ): Promise<void> => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Ride Booking" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Order Confirmation ✅",
//       html: `
//         <h2>Order Confirmation</h2>
//         <p>Hi, your order has been successfully placed! 🎉</p>
//         <h3>Order Details:</h3>
//         <p><strong>Pickup Date:</strong> ${new Date(
//           order.pickupDate
//         ).toLocaleDateString()}</p>
//         <p><strong>Pickup Time:</strong> ${order.pickupTime}</p>
//         <p><strong>Pickup Location:</strong> ${JSON.stringify(
//           order.pickupLocation
//         )}</p>
//         <p><strong>Destination:</strong> ${JSON.stringify(
//           order.destinationLocation
//         )}</p>
//         <p><strong>Price:</strong> $${order.price}</p>
//         <p>Thank you for choosing our service! 🚗💨</p>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Order confirmation email sent:", info.response);
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//   }
// };
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   console.log(success);
//   if (error) {
//     console.error("❌ Email server connection failed:", error);
//   } else {
//     console.log("✅ Nodemailer is ready to send emails!");
//   }
// });
export const sendOrderConfirmationEmail = async (
  email: string,
  order: Order
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Ride Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Order Confirmation ✅",
      html: `
        <h2>Order Confirmation</h2>
        <p>Hi, your order has been successfully placed! 🎉</p>
        <h3>Order Details:</h3>
        <p><strong>Pickup Date:</strong> ${new Date(
          order.pickupDate
        ).toLocaleDateString()}</p>
        <p><strong>Pickup Time:</strong> ${order.pickupTime}</p>
        <p><strong>Pickup Location:</strong> ${
          order.pickupLocation?.address || "Unknown"
        }</p>
        <p><strong>Destination:</strong> ${
          order.destinationLocation?.address || "Unknown"
        }</p>
        <p><strong>Price:</strong> $${order.price}</p>
        <p>Thank you for choosing our service! 🚗💨</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Order confirmation email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
