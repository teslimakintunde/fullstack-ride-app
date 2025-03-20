"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "lucide-react";

// Define the type for the order object
type Order = {
  startDate: string; // ISO string
  endDate: string; // ISO string
  pickupTime: string;
  persons: number;
  pickupLocation: { address: string } | null;
  destinationLocation: { address: string } | null;
  price: number;
};

const Success: React.FC = () => {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Retrieve order details from localStorage
    const savedOrder = localStorage.getItem("recentOrder");
    if (savedOrder) {
      const parsedOrder: Order = JSON.parse(savedOrder);
      setOrder(parsedOrder);
    }

    //Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 font-roboto">
      <div className="text-black shadow-lg rounded-lg p-8 text-center w-full max-w-md">
        <CheckCircleIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">
          Order Confirmed! 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          Your order has been successfully placed. You will receive a
          confirmation email shortly.
        </p>

        {/* Display Order Summary if Available */}
        {order && (
          <div className="bg-green-500 p-4 rounded-lg mt-4 text-left text-white">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <p className="text-white">
              <strong className="text-black">Start Date:</strong>{" "}
              {new Date(order.startDate).toLocaleDateString()}
            </p>
            <p className="text-white">
              <strong className="text-black">End Date:</strong>{" "}
              {new Date(order.endDate).toLocaleDateString()}
            </p>
            <p className="text-white">
              <strong className="text-black">Pickup Time:</strong>{" "}
              {order.pickupTime ? order.pickupTime : "N/A"}
            </p>
            <p className="text-white">
              <strong className="text-black">Passenger(s):</strong>{" "}
              {order.persons}
            </p>
            <p className="text-white">
              <strong className="text-black">Pickup Location:</strong>{" "}
              {order.pickupLocation?.address || "Unknown"}
            </p>
            <p className="text-white">
              <strong className="text-black">Destination:</strong>{" "}
              {order.destinationLocation?.address || "Unknown"}
            </p>
            <p className="text-white">
              <strong className="text-black">Price:</strong> ${order.price}
            </p>
          </div>
        )}
        <div className="mt-6 space-x-4">
          <button
            onClick={() => router.push("/")}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => router.push("/order-page")}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
