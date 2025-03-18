import type { Metadata } from "next";
import { Oswald, Roboto, Abril_Fatface } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/provider/AuthProvider";
import { ToasterProvider } from "@/utils/ToasterProvider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  weight: ["400", "400", "500", "700"],
  subsets: ["latin"],
});
const abriFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideEase - Book Your Ride Hassle-Free",
  description:
    "RideEase is your trusted ride booking platform. Book your ride effortlessly with real-time tracking, secure payments, and seamless user experience.",
  keywords:
    "Ride Booking, Car Rental, Transportation, Taxi Service, Secure Rides, Affordable Travel, Next.js, RideEase",
  authors: [
    { name: "Your Name", url: "https://fullstack-ride-app.vercel.app" },
  ], // Replace with your actual name & website
  robots: "index, follow",
  metadataBase: new URL("https://fullstack-ride-app.vercel.app"), // Change this to your actual domain
  openGraph: {
    title: "RideEase - Hassle-Free Ride Booking",
    description:
      "Book a ride with ease using RideEase. Enjoy fast, secure, and reliable ride-hailing services anytime, anywhere.",
    url: "https://fullstack-ride-app.vercel.app",
    images: [
      {
        url: "/hero-image.png", // Replace with your actual image path
        width: 1260,
        height: 800,
        alt: "RideEase - Hassle-Free Ride Booking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle", // Replace with your actual Twitter handle
    creator: "@yourTwitterHandle",
    title: "RideEase - Book Your Ride Hassle-Free",
    description:
      "Experience fast and reliable ride booking with RideEase. Secure payments, live tracking, and comfortable travel.",
    images: "/hero-image.png", // Ensure this image exists in your public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link
          rel="icon"
          href="/Favicon.png"
          sizes="32x32"
          type="image/x-icon"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}

        {/* Canonical URL */}
        <link rel="canonical" href="https://fullstack-ride-app.vercel.app" />
      </head>
      <body
        className={`${roboto.className} ${oswald.className} ${abriFatface.className} antialiased`}
      >
        <ToasterProvider />
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
