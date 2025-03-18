"use client";
import { FormEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(`${BASE_URL}/api/auth/reset-password}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }), // Send token and new password
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    if (response.ok) {
      setSuccess(data.message);
      setTimeout(() => router.push("/login"), 2000); // Redirect after success
    } else {
      setError(
        data.message || "An error occurred while resetting the password."
      );
    }
  };

  return (
    <section>
      <form
        onSubmit={handleResetPassword}
        className="max-w-md mx-auto py-[100px]"
      >
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="px-3 py-3 w-full border rounded-md"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium text-center w-full py-3 rounded-md mt-5"
          disabled={!token}
        >
          Reset Password
        </button>
      </form>
    </section>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
