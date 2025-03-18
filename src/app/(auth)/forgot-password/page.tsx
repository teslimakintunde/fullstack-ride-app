"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ForgotPasswordPin = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleRequestReset = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("A password reset link has been sent to your email.");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <section className="max-w-md mx-auto py-[100px] font-roboto text-center">
      <h2 className="text-[20px] md:text-3xl font-semibold">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-3 w-full my-5 border rounded-md"
        required
      />
      <button
        onClick={handleRequestReset}
        className="bg-blue-600 text-white font-medium w-full py-3 rounded-md"
      >
        Send Reset Link
      </button>
      {message && <p className="mt-3 text-green-500">{message}</p>}
    </section>
  );
};

const ForgotPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordPin />
    </Suspense>
  );
};

export default ForgotPassword;
