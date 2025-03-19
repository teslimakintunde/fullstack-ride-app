// "use client";
// import { useEffect, useState } from "react";

// // Define the type for an order
// interface Order {
//   id: string;
//   title: string;
//   pickupDate: string; // Assuming pickupDate is a string in ISO format
// }
// const OrderHistory: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchOrders = async () => {
//       const BASE_URL =
//         process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

//       try {
//         setLoading(true);
//         const response = await fetch(`${BASE_URL}/api/order`, {
//           signal: controller.signal, // Allows aborting the request
//           cache: "no-store", // Prevents fetching stale data
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }

//         const data = await response.json();
//         setOrders(data);
//       } catch (err) {
//         if (err instanceof Error) {
//           if (err.name !== "AbortError") {
//             setError(err.message);
//             console.error("Error fetching orders:", err.message);
//           }
//         } else {
//           console.error("Unexpected error:", err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();

//     return () => controller.abort(); // Cleanup on unmount
//   }, []);

//   if (loading) return <p>Loading orders...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   console.log(orders);

//   return (
//     <section className="container  py-[20vh]">
//       <div className="max-w-[600px] mx-auto overflow-hidden">
//         <h2 className="text-3xl mb-6 text-center">Order History</h2>
//         <div className="flex flex-col justify-center items-center gap-10">
//           {loading ? (
//             <p className="text-xl">Loading...</p>
//           ) : (
//             <ul className="flex flex-col gap-5">
//               {orders?.map((order) => (
//                 <li
//                   key={order.id}
//                   className="text-xl border p-4 rounded-lg shadow-md lg:w-96 w-full"
//                 >
//                   <strong>{order.title}</strong> -{" "}
//                   {new Date(order.pickupDate).toLocaleDateString()}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OrderHistory;
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the type for an order (updated for startDate and endDate)
interface Order {
  id: string;
  title: string;
  startDate: string; // ISO format string
  endDate: string; // ISO format string
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const controller = new AbortController();
    const fetchOrders = async () => {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/order`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.error("Error fetching orders:", err.message);
          }
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => controller.abort(); // Cleanup on unmount
  }, []);
  const handleBackToHome = () => {
    router.push("/"); // Navigate to homepage
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  console.log(orders);

  return (
    <section className="container py-[20vh] font-roboto">
      <div className="max-w-[600px] mx-auto overflow-hidden">
        <h2 className="text-3xl mb-6 text-center">Order History</h2>
        <div className="flex flex-col justify-center items-center gap-10">
          {loading ? (
            <p className="text-xl">Loading...</p>
          ) : (
            <>
              <ul className="flex flex-col gap-5">
                {orders?.map((order) => (
                  <li
                    key={order.id}
                    className="text-xl border p-4 rounded-lg shadow-md lg:w-96 w-full"
                  >
                    <strong>{order.title}</strong> -{" "}
                    {new Date(order.startDate).toLocaleDateString()} to{" "}
                    {new Date(order.endDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
              {/* Back to Home Button */}
              <button
                onClick={handleBackToHome}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mt-6"
              >
                Go Back to Home Page
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
